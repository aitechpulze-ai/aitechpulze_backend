from app import db
from datetime import datetime
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(db.Model):
    __tablename__ = 'users'
    __table_args__ = {'extend_existing': True}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    created_by = db.Column(db.String)
    deleted = db.Column(db.Boolean, default=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    updated_by = db.Column(db.String)
    email = db.Column(db.String(150), unique=True, nullable=False)
    email_verified = db.Column(db.Boolean, default=False)
    enabled = db.Column(db.Boolean, default=True)
    full_name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone = db.Column(db.String(255))
    role = db.Column(db.String(20), nullable=False)  # ADMIN, MENTOR, STUDENT
    username = db.Column(db.String(50))

    def to_dict(self, show_password=False):
        d = {
            'id': str(self.id),
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'role': self.role,
            'username': self.username,
            'active': self.active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }
        if self.role == 'TRAINER':
            d['name'] = self.full_name
            d['domain'] = self.phone  # Store domain in phone
            d['user_id'] = str(self.id)
            d['photo_url'] = self.created_by if self.created_by and self.created_by.startswith('http') else None
        if show_password:
            d['password'] = self.password
        return d
