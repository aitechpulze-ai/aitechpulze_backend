from dotenv import load_dotenv
load_dotenv()

from app import create_app
app = create_app()

with app.app_context():
    from app.utils.email import send_quote_request_email
    print("[TEST] Sending quote email to both recipients...", flush=True)
    try:
        send_quote_request_email(
            name='Test User',
            email='info@aitechpulze.com',
            phone='9999999999',
            project_type='Web Development',
            features=['SEO Optimization', 'Admin Dashboard'],
            estimated_cost=3400,
            description='Local test - checking both recipients'
        )
        print("[TEST] Done!", flush=True)
    except Exception as e:
        print(f"[TEST] ERROR: {type(e).__name__}: {e}", flush=True)
