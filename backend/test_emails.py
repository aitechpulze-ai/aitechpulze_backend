from dotenv import load_dotenv
load_dotenv()

from app import create_app
app = create_app()

with app.app_context():
    from app.utils.email import send_quote_request_email, send_credentials_email

    print("[TEST 1] Quote email -> aitechpulze@gmail.com only", flush=True)
    try:
        send_quote_request_email(
            name='Test User', email='test@example.com', phone='9999999999',
            project_type='Web Development', features=['SEO'],
            estimated_cost=3200, description='Test'
        )
    except Exception as e:
        print(f"[TEST 1] ERROR: {e}", flush=True)

    print("[TEST 2] Credentials email -> student + CC info@aitechpulze.com", flush=True)
    try:
        send_credentials_email(
            full_name='Test Student', email='info@aitechpulze.com',
            enrollment_id='AITP-001', username='teststudent',
            password='Test@123', domain='Python', plan='FIFTEEN_DAYS'
        )
    except Exception as e:
        print(f"[TEST 2] ERROR: {e}", flush=True)
