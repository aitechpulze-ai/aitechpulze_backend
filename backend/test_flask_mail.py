from dotenv import load_dotenv
load_dotenv()

from flask import Flask
from flask_mail import Mail, Message
import os

app = Flask(__name__)
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 465))
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = (os.getenv('MAIL_FROM_NAME', 'AiTechPulze'), os.getenv('MAIL_FROM'))

mail = Mail(app)

print(f"MAIL_SERVER: {app.config['MAIL_SERVER']}")
print(f"MAIL_PORT: {app.config['MAIL_PORT']}")
print(f"MAIL_USE_SSL: {app.config['MAIL_USE_SSL']}")
print(f"MAIL_USE_TLS: {app.config['MAIL_USE_TLS']}")
print(f"MAIL_USERNAME: {app.config['MAIL_USERNAME']}")
print(f"MAIL_DEFAULT_SENDER: {app.config['MAIL_DEFAULT_SENDER']}")

with app.app_context():
    try:
        msg = Message(
            subject='Test Flask-Mail',
            recipients=[os.getenv('MAIL_USERNAME')],
        )
        msg.body = 'Flask-Mail test from AiTechPulze'
        mail.send(msg)
        print("FLASK-MAIL SENT SUCCESSFULLY!")
    except Exception as e:
        print(f"FLASK-MAIL ERROR: {type(e).__name__}: {e}")
