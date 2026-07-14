from dotenv import load_dotenv
load_dotenv()
import os, smtplib, ssl
from email.mime.text import MIMEText

server = os.getenv('MAIL_SERVER')
port = int(os.getenv('MAIL_PORT', 465))
user = os.getenv('MAIL_USERNAME')
pwd = os.getenv('MAIL_PASSWORD')

print(f"Server: {server}")
print(f"Port: {port}")
print(f"User: {user}")
print(f"Password length: {len(pwd) if pwd else 0}")

try:
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(server, port, context=context) as s:
        s.login(user, pwd)
        print("LOGIN SUCCESS!")
        msg = MIMEText("Test email from AiTechPulze backend")
        msg['Subject'] = "Test Mail"
        msg['From'] = user
        msg['To'] = user
        s.sendmail(user, [user], msg.as_string())
        print("EMAIL SENT SUCCESSFULLY!")
except Exception as e:
    print(f"ERROR: {type(e).__name__}: {e}")
