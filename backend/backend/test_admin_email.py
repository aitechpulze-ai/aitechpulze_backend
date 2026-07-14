import sys
sys.stdout = open('test_output.txt', 'w')
sys.stderr = sys.stdout

from dotenv import load_dotenv
load_dotenv()

from app import create_app
app = create_app()

with app.app_context():
    from app.utils.email import send_student_application_admin_email
    try:
        send_student_application_admin_email({
            'full_name': 'Test Student',
            'email': 'teststudent@gmail.com',
            'phone': '9999999999',
            'domain': 'Python',
            'duration': '15 Days',
            'college': 'Test College',
            'year': '3rd Year',
            'department': 'CSE',
            'start_date': '2025-01-01',
        })
        print("DONE", flush=True)
    except Exception as e:
        import traceback
        print(f"TOP LEVEL ERROR: {e}", flush=True)
        traceback.print_exc()

sys.stdout.close()
