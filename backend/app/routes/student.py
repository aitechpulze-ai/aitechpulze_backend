from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.models import Internship, Attendance, Task, TaskSubmission, Certificate, MeetLink
from app.utils.upload import upload_file_to_cloudinary_or_local
import uuid
from datetime import datetime

student_bp = Blueprint('student', __name__)

def student_required(fn):
    from functools import wraps
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        claims = get_jwt()
        if claims.get('role') != 'INTERN':
            return jsonify({'error': 'Student access required'}), 403
        return fn(*args, **kwargs)
    return wrapper

def get_my_internship():
    student_id = uuid.UUID(get_jwt_identity())
    return Internship.query.filter_by(student_id=student_id, deleted=False).first()

# ─── PROFILE ─────────────────────────────────────────────────────────────────

@student_bp.route('/profile', methods=['GET'])
@student_required
def get_profile():
    internship = get_my_internship()
    if not internship:
        return jsonify({'error': 'No internship found'}), 404
    return jsonify(internship.to_dict())

# ─── ATTENDANCE ───────────────────────────────────────────────────────────────

@student_bp.route('/attendance', methods=['GET'])
@student_required
def get_attendance():
    internship = get_my_internship()
    if not internship:
        return jsonify([])
    records = Attendance.query.filter_by(
        internship_id=internship.id, deleted=False
    ).order_by(Attendance.date).all()
    return jsonify([r.to_dict() for r in records])

# ─── MEET LINK ────────────────────────────────────────────────────────────────

@student_bp.route('/meet-link', methods=['GET'])
@student_required
def get_meet_link():
    internship = get_my_internship()
    if not internship or not internship.mentor_id:
        return jsonify({'link': None})
    meet = MeetLink.query.filter_by(mentor_id=internship.mentor_id).first()
    return jsonify({'link': meet.link if meet else None})

# ─── TASKS & SUBMISSIONS ──────────────────────────────────────────────────────

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
    for a in allowed:
        if a in norm or norm in a:
            return a
    return 'WEB_DEVELOPMENT'

@student_bp.route('/tasks', methods=['GET'])
@student_required
def get_tasks():
    internship = get_my_internship()
    if not internship:
        return jsonify([])

    normalized_domain = normalize_domain(internship.domain)
    tasks = Task.query.filter_by(domain=normalized_domain, deleted=False).order_by(Task.week_number).all()
    result = []
    for t in tasks:
        td = t.to_dict()
        sub = TaskSubmission.query.filter_by(
            task_id=t.id, internship_id=internship.id, deleted=False
        ).first()
        td['submission'] = sub.to_dict() if sub else None
        result.append(td)
    return jsonify(result)

@student_bp.route('/tasks/<string:task_id>/submit', methods=['POST'])
@student_required
def submit_task(task_id):
    internship = get_my_internship()
    if not internship:
        return jsonify({'error': 'No internship found'}), 404

    github_link = request.form.get('github_link', '')
    demo_link = request.form.get('demo_link', '')
    student_notes = request.form.get('notes', '')
    file = request.files.get('file')

    file_url = None
    file_url = upload_file_to_cloudinary_or_local(file, folder='aitechpulze/submissions', resource_type='raw')
    if file and not file_url:
        return jsonify({'error': 'Failed to upload submission file.'}), 500

    task_uuid = uuid.UUID(task_id)
    existing = TaskSubmission.query.filter_by(task_id=task_uuid, internship_id=internship.id).first()
    if existing:
        existing.github_link = github_link
        existing.demo_link = demo_link
        existing.student_notes = student_notes
        existing.submission_attachment_url = file_url or existing.submission_attachment_url
        existing.status = 'PENDING'
    else:
        sub = TaskSubmission(
            id=uuid.uuid4(),
            internship_id=internship.id,
            task_id=task_uuid,
            github_link=github_link,
            demo_link=demo_link,
            student_notes=student_notes,
            submission_attachment_url=file_url,
            status='PENDING',
            active=True, deleted=False,
        )
        db.session.add(sub)
    db.session.commit()
    return jsonify({'message': 'Task submitted successfully'})

# ─── CERTIFICATE ──────────────────────────────────────────────────────────────

@student_bp.route('/certificate', methods=['GET'])
@student_required
def get_certificate():
    internship = get_my_internship()
    if not internship:
        return jsonify({'issued': False})
    cert = Certificate.query.filter_by(internship_id=internship.id, status='ISSUED', deleted=False).first()
    if not cert:
        return jsonify({'issued': False})
    return jsonify({'issued': True, **cert.to_dict()})
