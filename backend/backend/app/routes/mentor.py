from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.models import Internship, Attendance, Task, TaskSubmission, MeetLink
import cloudinary.uploader
import uuid
from datetime import datetime, date

mentor_bp = Blueprint('mentor', __name__)

def mentor_required(fn):
    from functools import wraps
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if claims.get('role') not in ('TRAINER', 'ADMIN', 'SUPER_ADMIN'):
            return jsonify({'error': 'Mentor access required'}), 403
        return fn(*args, **kwargs)
    return wrapper

def get_mentor_id():
    return uuid.UUID(get_jwt_identity())

# ─── STUDENTS ────────────────────────────────────────────────────────────────

@mentor_bp.route('/students', methods=['GET'])
@mentor_required
def get_my_students():
    mid = get_mentor_id()
    interns = Internship.query.filter_by(mentor_id=mid, deleted=False).all()
    return jsonify([i.to_dict(mask_phone=True) for i in interns])

@mentor_bp.route('/students/<string:internship_id>/submissions', methods=['GET'])
@mentor_required
def get_student_submissions(internship_id):
    internship = Internship.query.get_or_404(uuid.UUID(internship_id))
    # Normalize domain to match task domain
    normalized_domain = normalize_domain(internship.domain)
    tasks = Task.query.filter_by(domain=normalized_domain, deleted=False).all()
    
    result = []
    for t in tasks:
        td = t.to_dict()
        sub = TaskSubmission.query.filter_by(
            task_id=t.id, internship_id=internship.id, deleted=False
        ).first()
        td['submission'] = sub.to_dict() if sub else None
        result.append(td)
    return jsonify(result)

# ─── ATTENDANCE ───────────────────────────────────────────────────────────────

@mentor_bp.route('/attendance', methods=['POST'])
@mentor_required
def mark_attendance():
    mid = get_mentor_id()
    data = request.get_json()
    internship_id = uuid.UUID(data['internship_id'])
    att_date = date.fromisoformat(data.get('date', str(date.today())))
    present = data.get('present', True)

    existing = Attendance.query.filter_by(internship_id=internship_id, date=att_date).first()
    if existing:
        existing.present = present
        existing.remarks = data.get('remarks', '')
    else:
        att = Attendance(
            id=uuid.uuid4(),
            internship_id=internship_id,
            date=att_date,
            present=present,
            remarks=data.get('remarks', ''),
            active=True, deleted=False,
            created_by=str(mid),
        )
        db.session.add(att)
    db.session.commit()
    return jsonify({'message': 'Attendance marked'})

@mentor_bp.route('/attendance/<string:internship_id>', methods=['GET'])
@mentor_required
def get_attendance(internship_id):
    records = Attendance.query.filter_by(
        internship_id=uuid.UUID(internship_id), deleted=False
    ).order_by(Attendance.date).all()
    return jsonify([r.to_dict() for r in records])

# ─── MEET LINK ────────────────────────────────────────────────────────────────

@mentor_bp.route('/meet-link', methods=['POST'])
@mentor_required
def update_meet_link():
    mid = get_mentor_id()
    data = request.get_json()
    link = data.get('link')

    existing = MeetLink.query.filter_by(mentor_id=mid).first()
    if existing:
        existing.link = link
        existing.updated_at = datetime.utcnow()
    else:
        ml = MeetLink(mentor_id=mid, link=link)
        db.session.add(ml)
    db.session.commit()
    return jsonify({'message': 'Meet link updated'})

# ─── TASKS ────────────────────────────────────────────────────────────────────

@mentor_bp.route('/tasks', methods=['GET'])
@mentor_required
def get_tasks():
    domain = request.args.get('domain', '')
    q = Task.query.filter_by(deleted=False)
    if domain:
        q = q.filter_by(domain=domain)
    tasks = q.order_by(Task.week_number).all()
    return jsonify([t.to_dict() for t in tasks])

def normalize_domain(domain_str):
    if not domain_str:
        return 'WEB_DEVELOPMENT'
    norm = domain_str.upper().replace(' ', '_').replace('-', '_')
    allowed = [
        'AI_ML', 'WEB_DEVELOPMENT', 'APP_DEVELOPMENT', 'DATA_SCIENCE', 'DATA_ANALYST',
        'DEEP_LEARNING', 'PYTHON_DEVELOPMENT', 'HTML_CSS_JAVASCRIPT', 'JAVA_DEVELOPMENT',
        'DATABASE_MYSQL', 'DATABASE_POSTGRESQL', 'CYBERSECURITY', 'CLOUD_COMPUTING', 'UI_UX_DESIGN'
    ]
    if norm in allowed:
        return norm
    # Fuzzy matching
    for a in allowed:
        if a in norm or norm in a:
            return a
    return 'WEB_DEVELOPMENT'

@mentor_bp.route('/tasks', methods=['POST'])
@mentor_required
def create_task():
    import traceback
    try:
        title = request.form.get('title')
        description = request.form.get('description')
        student_id = request.form.get('student_id')
        
        if not title or not description:
            return jsonify({'error': 'Title and description are required'}), 400
        
        domain = 'General'
        if student_id and student_id.strip() and student_id != 'null' and student_id != 'undefined':
            try:
                internship = Internship.query.get(uuid.UUID(student_id))
                if internship:
                    domain = internship.domain
            except ValueError:
                pass
        else:
            mid = get_mentor_id()
            student = Internship.query.filter_by(mentor_id=mid, deleted=False).first()
            if student:
                domain = student.domain

        # Normalize domain to match Postgres check constraint values
        normalized = normalize_domain(domain)

        requirement_url = None
        task_file = request.files.get('file')
        if task_file and task_file.filename:
            try:
                result = cloudinary.uploader.upload(task_file, folder='aitechpulze/tasks', resource_type='raw')
                requirement_url = result.get('secure_url')
            except Exception as e:
                return jsonify({'error': f'Failed to upload assignment file: {str(e)}'}), 500

        task = Task(
            id=uuid.uuid4(),
            title=title,
            description=description,
            domain=normalized,
            week_number=1,
            requirement_url=requirement_url,
            active=True, deleted=False,
            created_by=str(get_mentor_id())
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({'message': 'Task created', 'task': task.to_dict()})
    except Exception as ex:
        print("CREATE_TASK ERROR:", traceback.format_exc())
        return jsonify({'error': str(ex), 'traceback': traceback.format_exc()}), 500


# ─── SUBMISSIONS ──────────────────────────────────────────────────────────────

@mentor_bp.route('/submissions/<string:task_id>', methods=['GET'])
@mentor_required
def get_submissions(task_id):
    subs = TaskSubmission.query.filter_by(
        task_id=uuid.UUID(task_id), deleted=False
    ).all()
    return jsonify([s.to_dict() for s in subs])

@mentor_bp.route('/submissions/<string:submission_id>/grade', methods=['POST'])
@mentor_required
def grade_submission(submission_id):
    data = request.get_json()
    sub = TaskSubmission.query.get_or_404(submission_id)
    sub.mentor_feedback = data.get('feedback', '')
    sub.grade_functionality = data.get('grade_functionality')
    sub.grade_code_cleanliness = data.get('grade_code_cleanliness')
    sub.grade_ui_polish = data.get('grade_ui_polish')
    sub.status = data.get('status', 'APPROVED')
    sub.graded_at = datetime.utcnow()
    db.session.commit()
    return jsonify({'message': 'Graded'})
