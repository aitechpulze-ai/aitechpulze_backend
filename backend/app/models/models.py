from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

# ============================================================
# INTERNSHIPS — student enrollment records
# maps: student_id → users.id, mentor_id → users.id
# status: PENDING | APPROVED | REJECTED | COMPLETED
# plan: FIFTEEN_DAYS | ONE_MONTH
# ============================================================
class Internship(db.Model):
    __tablename__ = 'internships'
    __table_args__ = {'extend_existing': True}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    active = db.Column(db.Boolean, default=True)
    deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = db.Column(db.String)

    student_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False)
    mentor_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=True)
    domain = db.Column(db.String(100), nullable=False)
    plan = db.Column(db.String(20), nullable=False)           # FIFTEEN_DAYS | ONE_MONTH
    status = db.Column(db.String(20), default='PENDING')      # PENDING | APPROVED | REJECTED | COMPLETED
    enrollment_id = db.Column(db.String(20), nullable=True)   # STUAITP001
    start_date = db.Column(db.Date, nullable=True)
    end_date = db.Column(db.Date, nullable=True)
    payment_confirmed = db.Column(db.Boolean, default=False)
    feedback_received = db.Column(db.Boolean, default=False)
    mentor_recommended = db.Column(db.Boolean, default=False)
    admin_notes = db.Column(db.Text, nullable=True)

    student = db.relationship('User', foreign_keys=[student_id], lazy='joined')
    mentor = db.relationship('User', foreign_keys=[mentor_id], lazy='joined')

    def to_dict(self, mask_phone=False):
        student = self.student
        mentor = self.mentor
        phone = student.phone if student else ''
        if mask_phone and phone:
            phone = phone[:2] + '*' * max(0, len(phone) - 4) + phone[-2:]

        # Lookup lead info to get college details
        from app.models.models import Lead
        lead = Lead.query.filter_by(email=student.email, deleted=False).first() if student else None
        info = {}
        if lead and lead.project_description:
            for part in lead.project_description.split('|'):
                part = part.strip()
                if ':' in part:
                    key, val = part.split(':', 1)
                    info[key.strip().lower()] = val.strip()

        return {
            'id': str(self.id),
            'enrollment_id': self.enrollment_id,
            'student_id': self.enrollment_id, # Frontend expects student_id
            'domain': self.domain,
            'plan': self.plan,
            'duration': "15 Days" if self.plan == 'FIFTEEN_DAYS' else "30 Days", # Frontend expects duration
            'college': info.get('college', ''),
            'department': info.get('dept', ''),
            'year': info.get('year', ''),
            'status': self.status,
            'start_date': str(self.start_date) if self.start_date else None,
            'end_date': str(self.end_date) if self.end_date else None,
            'payment_confirmed': self.payment_confirmed,
            'admin_notes': self.admin_notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'student': {
                'id': str(student.id) if student else None,
                'full_name': student.full_name if student else '',
                'email': student.email if student else '',
                'phone': phone,
                'username': student.username if student else '',
            } if student else None,
            'mentor': {
                'id': str(mentor.id) if mentor else None,
                'full_name': mentor.full_name if mentor else '',
                'email': mentor.email if mentor else '',
            } if mentor else None,
        }


# ============================================================
# ATTENDANCE — daily attendance per internship
# ============================================================
class Attendance(db.Model):
    __tablename__ = 'attendance'
    __table_args__ = {'extend_existing': True}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    active = db.Column(db.Boolean, default=True)
    deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = db.Column(db.String)

    internship_id = db.Column(UUID(as_uuid=True), db.ForeignKey('internships.id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    present = db.Column(db.Boolean, nullable=False, default=False)
    remarks = db.Column(db.String, nullable=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'internship_id': str(self.internship_id),
            'date': str(self.date),
            'present': self.present,
            'status': 'present' if self.present else 'absent',
            'remarks': self.remarks,
        }


# ============================================================
# TASKS — assignments created by mentors
# domain-specific, week_number for ordering
# ============================================================
class Task(db.Model):
    __tablename__ = 'tasks'
    __table_args__ = {'extend_existing': True}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    active = db.Column(db.Boolean, default=True)
    deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = db.Column(db.String)

    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    domain = db.Column(db.String(100), nullable=False)
    week_number = db.Column(db.Integer, nullable=False, default=1)
    requirement_url = db.Column(db.String(500), nullable=True)

    def to_dict(self):
        return {
            'id': str(self.id),
            'title': self.title,
            'description': self.description,
            'domain': self.domain,
            'week_number': self.week_number,
            'requirement_url': self.requirement_url,
            'file_url': self.requirement_url,
            'due_date': f"End of Week {self.week_number}",
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


# ============================================================
# TASK_SUBMISSIONS — student work submissions
# status: PENDING | SUBMITTED | GRADED
# ============================================================
class TaskSubmission(db.Model):
    __tablename__ = 'task_submissions'
    __table_args__ = {'extend_existing': True}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    active = db.Column(db.Boolean, default=True)
    deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = db.Column(db.String)

    internship_id = db.Column(UUID(as_uuid=True), db.ForeignKey('internships.id'), nullable=False)
    task_id = db.Column(UUID(as_uuid=True), db.ForeignKey('tasks.id'), nullable=False)
    status = db.Column(db.String(20), default='PENDING')  # PENDING | SUBMITTED | GRADED
    github_link = db.Column(db.String(500), nullable=True)
    demo_link = db.Column(db.String(500), nullable=True)
    submission_attachment_url = db.Column(db.String(500), nullable=True)
    student_notes = db.Column(db.Text, nullable=True)
    mentor_feedback = db.Column(db.Text, nullable=True)
    grade_functionality = db.Column(db.Integer, nullable=True)
    grade_code_cleanliness = db.Column(db.Integer, nullable=True)
    grade_ui_polish = db.Column(db.Integer, nullable=True)
    graded_at = db.Column(db.DateTime, nullable=True)

    task = db.relationship('Task', lazy='joined')

    def to_dict(self):
        return {
            'id': str(self.id),
            'internship_id': str(self.internship_id),
            'task_id': str(self.task_id),
            'task': self.task.to_dict() if self.task else None,
            'status': self.status,
            'github_link': self.github_link,
            'demo_link': self.demo_link,
            'submission_attachment_url': self.submission_attachment_url,
            'student_notes': self.student_notes,
            'mentor_feedback': self.mentor_feedback,
            'grade_functionality': self.grade_functionality,
            'grade_code_cleanliness': self.grade_code_cleanliness,
            'grade_ui_polish': self.grade_ui_polish,
            'graded_at': self.graded_at.isoformat() if self.graded_at else None,
        }


# ============================================================
# CERTIFICATES
# status: PENDING | ISSUED | REVOKED
# certificate_number = CERTAITP001
# ============================================================
class Certificate(db.Model):
    __tablename__ = 'certificates'
    __table_args__ = {'extend_existing': True}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    active = db.Column(db.Boolean, default=True)
    deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = db.Column(db.String)

    internship_id = db.Column(UUID(as_uuid=True), db.ForeignKey('internships.id'), nullable=False)
    certificate_number = db.Column(db.String(20), nullable=False)  # CERTAITP001
    certificate_url = db.Column(db.String(500), nullable=True)
    verify_url = db.Column(db.String(500), nullable=True)
    issued_date = db.Column(db.Date, nullable=True)
    status = db.Column(db.String(20), default='PENDING')  # PENDING | ISSUED | REVOKED

    internship = db.relationship('Internship', lazy='joined')

    def to_dict(self):
        intern = self.internship
        student = intern.student if intern else None
        return {
            'id': str(self.id),
            'certificate_number': self.certificate_number,
            'certificate_url': self.certificate_url,
            'verify_url': self.verify_url,
            'issued_date': str(self.issued_date) if self.issued_date else None,
            'status': self.status,
            'internship': intern.to_dict() if intern else None,
            'student_name': student.full_name if student else '',
            'domain': intern.domain if intern else '',
            'plan': intern.plan if intern else '',
            'start_date': str(intern.start_date) if intern and intern.start_date else '',
            'end_date': str(intern.end_date) if intern and intern.end_date else '',
        }


# ============================================================
# LEADS — public application form submissions (Apply Now)
# ============================================================
class Lead(db.Model):
    __tablename__ = 'leads'
    __table_args__ = {'extend_existing': True}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    active = db.Column(db.Boolean, default=True)
    deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = db.Column(db.String)

    full_name = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    phone = db.Column(db.String(20), nullable=True)
    project_type = db.Column(db.String(100), nullable=True)   # repurposed as domain
    project_description = db.Column(db.Text, nullable=True)   # repurposed as college/year/dept
    estimated_budget = db.Column(db.Float, nullable=True)      # repurposed as duration (15/30 days)
    source = db.Column(db.String(50), nullable=True)           # 'internship_form'
    status = db.Column(db.String(20), default='NEW')
    admin_notes = db.Column(db.Text, nullable=True)
    pdf_url = db.Column(db.String(500), nullable=True)         # resume URL

    def to_dict(self):
        # Parse description: "DOB: ... | College: ... | Year: ... | Dept: ... | Start: ... | End: ..."
        info = {}
        if self.project_description:
            for part in self.project_description.split('|'):
                part = part.strip()
                if ':' in part:
                    key, val = part.split(':', 1)
                    info[key.strip().lower()] = val.strip()

        return {
            'id': str(self.id),
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'domain': self.project_type,
            'college': info.get('college', ''),
            'year': info.get('year', ''),
            'department': info.get('dept', ''),
            'dob': info.get('dob', ''),
            'start_date': info.get('start', ''),
            'end_date': info.get('end', ''),
            'duration': int(self.estimated_budget) if self.estimated_budget else 15,
            'resume_url': self.pdf_url,
            'status': self.status,
            'admin_notes': self.admin_notes,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }


# ============================================================
# MEET LINKS — we create a new simple table for this
# ============================================================
class MeetLink(db.Model):
    __tablename__ = 'meet_links'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    mentor_id = db.Column(UUID(as_uuid=True), db.ForeignKey('users.id'), nullable=False, unique=True)
    link = db.Column(db.String(500), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'mentor_id': str(self.mentor_id),
            'link': self.link,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
