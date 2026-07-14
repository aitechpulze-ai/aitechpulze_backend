from flask import Blueprint, request, jsonify
from app import db
from app.models.models import Certificate, Internship, Lead
import cloudinary.uploader
import uuid
from datetime import datetime

public_bp = Blueprint('public', __name__)

# ─── APPLY (Internship Application Form) ─────────────────────────────────────

@public_bp.route('/apply', methods=['POST'])
def apply():
    full_name = request.form.get('full_name', '').strip()
    email = request.form.get('email', '').strip().lower()
    phone = request.form.get('phone', '').strip()
    college = request.form.get('college', '')
    year = request.form.get('year', '')
    department = request.form.get('department', '')
    domain = request.form.get('domain', '')
    duration = request.form.get('duration', '')
    start_date = request.form.get('start_date', '')
    end_date = request.form.get('end_date', '')
    dob = request.form.get('dob', '')
    resume = request.files.get('resume')

    if not full_name or not email:
        return jsonify({'error': 'Name and email are required'}), 400

    resume_url = None
    if resume:
        try:
            result = cloudinary.uploader.upload(resume, folder='aitechpulze/resumes', resource_type='raw')
            resume_url = result.get('secure_url')
        except Exception as e:
            print(f'[CLOUDINARY] Resume upload failed: {e}')

    # Build description with academic details
    description = f"DOB: {dob} | College: {college} | Year: {year} | Dept: {department} | Start: {start_date} | End: {end_date}"
    duration_days = 15 if '15' in duration else 30

    lead = Lead(
        id=uuid.uuid4(),
        full_name=full_name,
        email=email,
        phone=phone,
        project_type=domain,
        project_description=description,
        estimated_budget=float(duration_days),
        source='WEBSITE',
        status='NEW',
        pdf_url=resume_url,
        active=True,
        deleted=False,
    )
    db.session.add(lead)
    db.session.commit()

    # Sync to Google Sheets
    try:
        from app.utils.sheets import sync_to_sheets
        sync_to_sheets({
            'full_name': full_name,
            'email': email,
            'phone': phone,
            'domain': domain,
            'duration': duration,
            'college': college,
            'year': year,
            'department': department,
            'start_date': start_date,
            'end_date': end_date,
            'resume_url': resume_url or '',
        })
    except Exception as e:
        print(f'[SHEETS] Sync failed: {e}')

    # Send application notification emails (disabled, handled by frontend EmailJS)
    # try:
    #     from app.utils.email import send_student_application_admin_email, send_student_welcome_email
    #     # 1. Alert admin (info@aitechpulze.com)
    #     send_student_application_admin_email({
    #         'full_name': full_name,
    #         'email': email,
    #         'phone': phone,
    #         'domain': domain,
    #         'duration': duration,
    #         'college': college,
    #         'year': year,
    #         'department': department,
    #         'start_date': start_date,
    #     })
    #     # 2. Send welcome email to student
    #     send_student_welcome_email(full_name, email, domain)
    # catch Exception as e:
    #     print(f'[EMAIL] Application email triggers failed: {e}')

    return jsonify({
        'message': 'Application submitted successfully! Awaiting admin approval.',
        'id': str(lead.id),
        'resume_url': resume_url
    }), 201


# ─── VERIFY CERTIFICATE ───────────────────────────────────────────────────────

@public_bp.route('/verify/<string:cert_num>', methods=['GET'])
def verify_certificate(cert_num):
    cert = Certificate.query.filter_by(
        certificate_number=cert_num.upper(),
        status='ISSUED',
        deleted=False
    ).first()
    if not cert:
        return jsonify({'verified': False, 'message': 'Certificate not found or not yet issued'}), 404
    return jsonify({'verified': True, **cert.to_dict()})

# ─── PROJECT QUOTE REQUEST ───────────────────────────────────────────────────

@public_bp.route('/quote', methods=['POST'])
def submit_quote_request():
    data = request.get_json() or {}
    name = data.get('name', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    project_type = data.get('project_type', '')
    features = data.get('features', [])
    estimated_cost = data.get('estimated_cost', 0)
    description = data.get('description', '')

    if not name or not email:
        return jsonify({'error': 'Name and email are required'}), 400

    # Also log to leads database as a new estimate lead
    try:
        lead = Lead(
            id=uuid.uuid4(),
            full_name=name,
            email=email,
            phone=phone,
            project_type=project_type,
            project_description=description,
            estimated_budget=float(estimated_cost),
            source='QUOTE_FORM',
            status='NEW',
            active=True,
            deleted=False,
        )
        db.session.add(lead)
        db.session.commit()
    except Exception as db_err:
        print(f'[DATABASE] Failed to save quote lead: {db_err}')

    # Send notification email to admin (disabled, handled by frontend EmailJS)
    # try:
    #     from app.utils.email import send_quote_request_email
    #     send_quote_request_email(
    #         name=name,
    #         email=email,
    #         phone=phone,
    #         project_type=project_type,
    #         features=features,
    #         estimated_cost=estimated_cost,
    #         description=description
    #     )
    # catch Exception as email_err:
    #     print(f'[EMAIL] Failed to send quote email: {email_err}')

    return jsonify({
        'message': 'Your quote request has been submitted successfully! We will get back to you soon.'
    }), 200
