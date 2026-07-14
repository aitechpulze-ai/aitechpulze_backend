from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from werkzeug.security import generate_password_hash
from app import db
from app.models.user import User
from app.models.models import Internship, Certificate, Task, MeetLink
from app.utils.upload import upload_file_to_cloudinary_or_local
import uuid, re
from datetime import datetime

admin_bp = Blueprint('admin', __name__)

def admin_required(fn):
    from functools import wraps
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if claims.get('role') not in ('ADMIN', 'SUPER_ADMIN'):
            return jsonify({'error': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    return wrapper

def next_enrollment_id():
    last = Internship.query.filter(Internship.enrollment_id != None).order_by(Internship.created_at.desc()).first()
    num = 1
    if last and last.enrollment_id:
        try:
            num = int(last.enrollment_id.replace('STUAITP', '')) + 1
        except:
            num = 1
    while True:
        candidate = f'STUAITP{str(num).zfill(3)}'
        if not Internship.query.filter_by(enrollment_id=candidate).first():
            return candidate
        num += 1

def next_cert_id():
    last = Certificate.query.order_by(Certificate.created_at.desc()).first()
    num = 1
    if last and last.certificate_number:
        try:
            num = int(last.certificate_number.replace('CERTAITP', '')) + 1
        except:
            num = 1
    while True:
        candidate = f'CERTAITP{str(num).zfill(3)}'
        if not Certificate.query.filter_by(certificate_number=candidate).first():
            return candidate
        num += 1

def make_credentials(name, phone):
    username = re.sub(r'\s+', '', name).lower()[:4]
    password = username + (phone[-5:] if phone and len(phone) >= 5 else '00000')
    return username, password

# ─── APPLICATIONS (Leads) ────────────────────────────────────────────────────

@admin_bp.route('/applications', methods=['GET'])
@admin_required
def get_applications():
    from app.models.models import Lead
    status = request.args.get('status')
    q = Lead.query.filter_by(source='WEBSITE', deleted=False)
    if status:
        q = q.filter_by(status=status.upper())
    leads = q.order_by(Lead.created_at.desc()).all()
    return jsonify([l.to_dict() for l in leads])

@admin_bp.route('/applications/<string:lead_id>/approve', methods=['POST'])
@admin_required
def approve_application(lead_id):
    try:
        from app.models.models import Lead
        lead = Lead.query.get_or_404(lead_id)
        if lead.status == 'CONVERTED':
            return jsonify({'error': 'Already approved'}), 400

        data = request.get_json() or {}
        domain = lead.project_type or data.get('domain', 'Web Development')
        plan = 'FIFTEEN_DAYS' if (lead.estimated_budget and lead.estimated_budget <= 15) else 'ONE_MONTH'
        start_date = data.get('start_date')

        username, raw_password = make_credentials(lead.full_name, lead.phone)
        enrollment_id = next_enrollment_id()

        # Check if user already exists
        if User.query.filter_by(email=lead.email).first():
            return jsonify({'error': 'A user with this email already exists.'}), 400

        # Create student user
        student = User(
            id=uuid.uuid4(),
            full_name=lead.full_name,
            email=lead.email,
            phone=lead.phone,
            password=generate_password_hash(raw_password),
            role='INTERN',
            username=username,
            active=True,
            deleted=False,
            enabled=True,
            email_verified=False,
        )
        db.session.add(student)
        db.session.flush()

        # Create internship record
        from datetime import date, timedelta
        s_date = date.fromisoformat(start_date) if start_date else date.today()
        duration_days = 15 if plan == 'FIFTEEN_DAYS' else 30
        e_date = s_date + timedelta(days=duration_days)
        
        internship = Internship(
            id=uuid.uuid4(),
            student_id=student.id,
            domain=domain,
            plan=plan,
            status='ACTIVE',
            enrollment_id = enrollment_id,
            start_date=s_date,
            end_date=e_date,
            payment_confirmed=True,
            active=True,
            deleted=False,
        )
        db.session.add(internship)
        lead.status = 'CONVERTED'
        lead.admin_notes = f'Approved. Student ID: {enrollment_id}, Username: {username}'
        db.session.commit()

        # Send credentials via email
        try:
            from app.utils.email import send_credentials_email
            send_credentials_email(lead.full_name, lead.email, enrollment_id, username, raw_password, domain, plan)
        except Exception as e:
            print(f'[EMAIL] Failed: {e}')

        return jsonify({'message': 'Approved', 'enrollment_id': enrollment_id, 'username': username, 'password': raw_password})
    except Exception as e:
        import traceback
        print(f"[APPROVE ERROR] {traceback.format_exc()}")
        db.session.rollback()
        return jsonify({'error': str(e), 'traceback': traceback.format_exc()}), 500

@admin_bp.route('/applications/<string:lead_id>/reject', methods=['POST'])
@admin_required
def reject_application(lead_id):
    from app.models.models import Lead
    lead = Lead.query.get_or_404(lead_id)
    lead.status = 'REJECTED'
    db.session.commit()
    return jsonify({'message': 'Rejected'})

# ─── STUDENTS ────────────────────────────────────────────────────────────────

@admin_bp.route('/students', methods=['GET'])
@admin_required
def get_students():
    interns = Internship.query.filter(
        Internship.status.in_(['ACTIVE', 'COMPLETED']),
        Internship.deleted == False
    ).order_by(Internship.created_at.desc()).all()
    return jsonify([i.to_dict() for i in interns])

@admin_bp.route('/students/<string:internship_id>/assign-mentor', methods=['POST'])
@admin_required
def assign_mentor(internship_id):
    data = request.get_json() or {}
    mentor_id = data.get('mentor_id')
    if not mentor_id:
        return jsonify({'error': 'Mentor ID is required'}), 400

    internship = Internship.query.get_or_404(internship_id)
    try:
        internship.mentor_id = uuid.UUID(mentor_id)
    except ValueError:
        return jsonify({'error': 'Invalid Mentor ID format'}), 400

    db.session.commit()
    return jsonify({'message': 'Mentor assigned'})

# ─── MENTORS ─────────────────────────────────────────────────────────────────

@admin_bp.route('/mentors', methods=['GET'])
@admin_required
def get_mentors():
    mentors = User.query.filter_by(role='TRAINER', deleted=False).all()
    return jsonify([m.to_dict() for m in mentors])

@admin_bp.route('/mentors', methods=['POST'])
@admin_required
def add_mentor():
    try:
        name = request.form.get('name')
        email = request.form.get('email', '').strip().lower()
        password = request.form.get('password')
        domain = request.form.get('domain')
        photo = request.files.get('photo')

        if not email:
            return jsonify({'error': 'Email is required'}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'A user with this email already exists'}), 400

        photo_url = upload_file_to_cloudinary_or_local(photo, folder='aitechpulze/mentors')

        mentor = User(
            id=uuid.uuid4(),
            full_name=name,
            email=email,
            password=generate_password_hash(password),
            role='TRAINER',
            username=email.split('@')[0],
            phone=domain,  # store domain in phone temporarily
            created_by=photo_url,  # store photo_url in created_by
            active=True, deleted=False, enabled=True, email_verified=False,
        )
        db.session.add(mentor)
        db.session.commit()
        return jsonify({'message': 'Mentor added', 'mentor': mentor.to_dict()})
    except Exception as e:
        import traceback
        print(f"[ADD MENTOR ERROR] {traceback.format_exc()}")
        db.session.rollback()
        return jsonify({'error': str(e), 'traceback': traceback.format_exc()}), 500

@admin_bp.route('/mentors/<string:mentor_id>', methods=['DELETE'])
@admin_required
def delete_mentor(mentor_id):
    mentor = User.query.get_or_404(mentor_id)
    claims = get_jwt()
    if claims.get('role') not in ('ADMIN', 'SUPER_ADMIN'):
        return jsonify({'error': 'Access denied'}), 403
    if mentor.role != 'TRAINER':
        return jsonify({'error': 'Not a mentor'}), 400
    mentor.deleted = True
    db.session.commit()
    return jsonify({'message': 'Mentor deleted'})

# ─── TASKS (Assignments) ─────────────────────────────────────────────────────

@admin_bp.route('/tasks', methods=['GET'])
@admin_required
def get_tasks():
    domain = request.args.get('domain')
    q = Task.query.filter_by(deleted=False)
    if domain:
        q = q.filter_by(domain=domain)
    tasks = q.order_by(Task.domain, Task.week_number).all()
    return jsonify([t.to_dict() for t in tasks])

@admin_bp.route('/tasks', methods=['POST'])
@admin_required
def create_task():
    data = request.get_json()
    task = Task(
        id=uuid.uuid4(),
        title=data['title'],
        description=data['description'],
        domain=data['domain'],
        week_number=data.get('week_number', 1),
        requirement_url=data.get('requirement_url'),
        active=True, deleted=False,
    )
    db.session.add(task)
    db.session.commit()
    return jsonify({'message': 'Task created', 'task': task.to_dict()})

# ─── CERTIFICATES ─────────────────────────────────────────────────────────────

@admin_bp.route('/certificates/issue/<string:internship_id>', methods=['POST'])
@admin_required
def issue_certificate(internship_id):
    internship = Internship.query.get_or_404(internship_id)
    cert_file = request.files.get('certificate')
    if not cert_file:
        return jsonify({'error': 'Certificate file required'}), 400

    cert_num = next_cert_id()
    cert_url = upload_file_to_cloudinary_or_local(cert_file, folder='aitechpulze/certificates', resource_type='raw')
    if not cert_url:
        return jsonify({'error': 'Failed to upload certificate file.'}), 500

    from datetime import date
    cert = Certificate(
        id=uuid.uuid4(),
        internship_id=internship.id,
        certificate_number=cert_num,
        certificate_url=cert_url,
        verify_url=f'https://aitechpulze.com/verify/{cert_num}',
        issued_date=date.today(),
        status='ISSUED',
        active=True, deleted=False,
    )
    db.session.add(cert)
    internship.status = 'COMPLETED'
    db.session.commit()
    return jsonify({'message': 'Certificate issued', 'cert_id': cert_num, 'cert_url': cert_url})

# ─── ANALYTICS ───────────────────────────────────────────────────────────────

@admin_bp.route('/analytics', methods=['GET'])
@admin_required
def analytics():
    from app.models.models import Lead
    total = Lead.query.filter_by(source='WEBSITE', deleted=False).count()
    pending = Lead.query.filter_by(source='WEBSITE', status='NEW', deleted=False).count()
    approved = Internship.query.filter(Internship.deleted == False).count()
    completed = Internship.query.filter_by(status='COMPLETED', deleted=False).count()
    certs = Certificate.query.filter_by(status='ISSUED', deleted=False).count()
    mentors = User.query.filter_by(role='TRAINER', deleted=False).count()
    return jsonify({
        'total': total,
        'pending': pending,
        'approved': approved,
        'completed': completed,
        'certificates_issued': certs,
        'mentors': mentors
    })

@admin_bp.route('/applications/<string:lead_id>', methods=['DELETE'])
@admin_required
def delete_application(lead_id):
    from app.models.models import Lead
    lead = Lead.query.get_or_404(lead_id)
    lead.deleted = True
    db.session.commit()
    return jsonify({'message': 'Application deleted'})

@admin_bp.route('/students/<string:internship_id>', methods=['DELETE'])
@admin_required
def delete_student(internship_id):
    internship = Internship.query.get_or_404(internship_id)
    internship.deleted = True
    
    # Soft delete the associated student user account
    student = User.query.get(internship.student_id)
    if student:
        student.deleted = True
        
    db.session.commit()
    return jsonify({'message': 'Student deleted'})

@admin_bp.route('/students/export', methods=['GET'])
@admin_required
def export_students_csv():
    import csv
    from io import StringIO
    from flask import make_response
    
    # Query all non-deleted internships
    internships = Internship.query.filter_by(deleted=False).order_by(Internship.created_at.desc()).all()
    
    si = StringIO()
    cw = csv.writer(si)
    
    # Write CSV Header
    cw.writerow([
        'Enrollment ID', 'Student Name', 'Email', 'Phone', 'Domain', 'Duration',
        'College', 'Department', 'Year', 'Start Date', 'End Date',
        'Mentor Name', 'Mentor Email', 'Status', 'Created At'
    ])
    
    # Write rows
    for item in internships:
        d = item.to_dict()
        student_info = d.get('student') or {}
        mentor_info = d.get('mentor') or {}
        
        cw.writerow([
            d.get('enrollment_id', '') or '',
            student_info.get('full_name', ''),
            student_info.get('email', ''),
            student_info.get('phone', ''),
            d.get('domain', ''),
            d.get('duration', ''),
            d.get('college', ''),
            d.get('department', ''),
            d.get('year', ''),
            d.get('start_date', '') or '',
            d.get('end_date', '') or '',
            mentor_info.get('full_name', 'Not Assigned'),
            mentor_info.get('email', ''),
            d.get('status', ''),
            d.get('created_at', '')
        ])
        
    response = make_response(si.getvalue())
    response.headers["Content-Disposition"] = "attachment; filename=students_export.csv"
    response.headers["Content-type"] = "text/csv; charset=utf-8"
    return response
