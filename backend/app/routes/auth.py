from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.models.user import User
from werkzeug.security import check_password_hash
import bcrypt

auth_bp = Blueprint('auth', __name__)

def verify_password(plain: str, hashed: str) -> bool:
    """Supports both BCrypt (Spring Boot) and Werkzeug hashes."""
    try:
        # Try BCrypt first (Spring Boot format: $2a$... or $2b$...)
        if hashed.startswith('$2'):
            return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))
        # Fall back to Werkzeug
        return check_password_hash(hashed, plain)
    except Exception:
        return False


@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').strip().lower()
    password = data.get('password', '')
    role = data.get('role', '').upper()

    user = User.query.filter_by(email=email, deleted=False).first()

    if not user:
        return jsonify({'error': 'No account found with this email'}), 401
    if not verify_password(password, user.password):
        return jsonify({'error': 'Invalid password'}), 401

    # Dynamic re-hashing of password on successful login to speed up future logins!
    if not user.password.startswith('pbkdf2:sha256:150000'):
        from werkzeug.security import generate_password_hash
        from app import db
        try:
            user.password = generate_password_hash(password, method='pbkdf2:sha256:150000')
            db.session.commit()
        except Exception as e:
            db.session.rollback()

    # Allow SUPER_ADMIN to log in as admin portal
    allowed_roles = {'ADMIN': ['ADMIN', 'SUPER_ADMIN'], 'MENTOR': ['TRAINER'], 'STUDENT': ['INTERN']}
    if role and user.role not in allowed_roles.get(role, [role]):
        return jsonify({'error': f'This account is not authorized for the {role.lower()} portal'}), 403


    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            'role': user.role,
            'email': user.email,
            'name': user.full_name
        }
    )
    return jsonify({'token': token, 'user': user.to_dict()}), 200
