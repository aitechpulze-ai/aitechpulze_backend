from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_cors import CORS
import cloudinary
from config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Init extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    mail.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, allow_headers="*")

    # Init Cloudinary
    cloudinary.config(
        cloud_name=app.config['CLOUDINARY_CLOUD_NAME'],
        api_key=app.config['CLOUDINARY_API_KEY'],
        api_secret=app.config['CLOUDINARY_API_SECRET']
    )

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.admin import admin_bp
    from app.routes.mentor import mentor_bp
    from app.routes.student import student_bp
    from app.routes.public import public_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    app.register_blueprint(mentor_bp, url_prefix='/api/mentor')
    app.register_blueprint(student_bp, url_prefix='/api/student')
    app.register_blueprint(public_bp, url_prefix='/api/public')

    with app.app_context():
        # Only create meet_links table (new table, all others already exist)
        from app.models.models import MeetLink
        db.create_all()
        seed_admin(app)

    return app


def seed_admin(app):
    from app.models.user import User
    from werkzeug.security import generate_password_hash
    existing = User.query.filter_by(email=app.config['ADMIN_EMAIL']).first()
    if not existing:
        import uuid
        admin = User(
            id=uuid.uuid4(),
            full_name='Admin',
            email=app.config['ADMIN_EMAIL'],
            password=generate_password_hash(app.config['ADMIN_PASSWORD']),
            role='ADMIN',
            username='admin',
            active=True,
            deleted=False,
            enabled=True,
            email_verified=True,
        )
        db.session.add(admin)
        db.session.commit()
        print(f"[SEED] Admin created: {app.config['ADMIN_EMAIL']}")
    else:
        print(f"[SEED] Admin already exists: {existing.email} ({existing.role})")
