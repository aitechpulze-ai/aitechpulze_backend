import resend
from flask import current_app

def get_resend_client():
    resend.api_key = current_app.config.get('RESEND_API_KEY')

def send_credentials_email(full_name, email, enrollment_id, username, password, domain, plan):
    get_resend_client()
    plan_label = '15 Days' if plan == 'FIFTEEN_DAYS' else '1 Month'
    try:
        resend.Emails.send({
            "from": "AiTechPulze <info@aitechpulze.com>",
            "to": [email],
            "cc": ["info@aitechpulze.com"],
            "subject": "🎉 Your AiTechPulze Internship is Approved!",
            "html": f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #2563EB, #7c3aed); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">🎉 Congratulations!</h1>
            <p style="color: rgba(255,255,255,0.85); margin-top: 8px;">Your internship application has been approved.</p>
          </div>
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <p style="color: #334155; font-size: 16px;">Hi <strong>{full_name}</strong>,</p>
            <p style="color: #64748b;">Welcome to the AiTechPulze Internship Program! Here are your login credentials:</p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <p style="margin:0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Student ID</p>
              <p style="margin:4px 0 16px; font-size:20px; font-weight:800; color:#2563EB;">{enrollment_id}</p>
              <p style="margin:0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Username</p>
              <p style="margin:4px 0 16px; font-size:20px; font-weight:800; color:#1e293b;">{username}</p>
              <p style="margin:0; color:#94a3b8; font-size:12px; text-transform:uppercase; letter-spacing:1px;">Password</p>
              <p style="margin:4px 0 0; font-size:20px; font-weight:800; color:#1e293b;">{password}</p>
            </div>
            <a href="https://aitechpulze.com/portal/student"
               style="display:block; background:linear-gradient(135deg,#2563EB,#7c3aed); color:white; text-align:center; padding:14px; border-radius:10px; text-decoration:none; font-weight:700; font-size:16px;">
               Login to Your Portal →
            </a>
            <p style="color:#94a3b8; font-size:12px; margin-top:24px; text-align:center;">
              Domain: <strong>{domain}</strong> | Duration: <strong>{plan_label}</strong>
            </p>
          </div>
        </div>
        """
        })
        print(f"[EMAIL] Credentials email sent to {email}", flush=True)
    except Exception as e:
        print(f"[EMAIL] Failed to send credentials email: {e}", flush=True)


def send_quote_request_email(name, email, phone, project_type, features, estimated_cost, description):
    get_resend_client()
    features_html = "".join([f"<li style='margin-bottom:5px;'>{f}</li>" for f in features]) if features else "<li>None selected</li>"
    try:
        resend.Emails.send({
            "from": "AiTechPulze <info@aitechpulze.com>",
            "to": ["info@aitechpulze.com"],
            "reply_to": email,
            "subject": f"💼 New Project Quote Request from {name}",
            "html": f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
          <div style="background: linear-gradient(135deg, #4f46e5, #818cf8); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">💼 New Quote Request</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 8px;">A visitor has requested a project estimate.</p>
          </div>
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; margin-top: 0;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td><td>{name}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:{email}">{email}</a></td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>{phone}</td></tr>
            </table>
            <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Project Estimate</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 6px 0; font-weight: bold; width: 120px;">Project Type:</td><td>{project_type}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Estimated Cost:</td><td style="font-size: 18px; font-weight: bold; color: #4f46e5;">₹{estimated_cost:,}</td></tr>
            </table>
            <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Selected Features</h3>
            <ul style="margin: 0; padding-left: 20px; margin-bottom: 24px;">{features_html}</ul>
            <h3 style="color: #1e293b; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Project Description</h3>
            <p style="white-space: pre-wrap; background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; color: #475569;">{description or "No description provided."}</p>
          </div>
        </div>
        """
        })
        print(f"[EMAIL] Quote email sent to aitechpulze@gmail.com", flush=True)
    except Exception as e:
        print(f"[EMAIL] Failed to send quote email: {e}", flush=True)


def send_student_application_admin_email(data):
    get_resend_client()
    try:
        resend.Emails.send({
            "from": "AiTechPulze <info@aitechpulze.com>",
            "to": ["info@aitechpulze.com"],
            "reply_to": data['email'],
            "subject": f"🎓 New Internship Application: {data['full_name']}",
            "html": f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
          <div style="background: linear-gradient(135deg, #10b981, #059669); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🎓 New Student Registered</h1>
            <p style="color: rgba(255,255,255,0.9); margin-top: 8px;">A new internship application has been submitted.</p>
          </div>
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
              <tr><td style="padding: 6px 0; font-weight: bold; width: 120px;">Name:</td><td>{data['full_name']}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Email:</td><td><a href="mailto:{data['email']}">{data['email']}</a></td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Phone:</td><td>{data['phone']}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Domain:</td><td style="font-weight: bold; color: #10b981;">{data['domain']}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Duration:</td><td>{data['duration']}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">College:</td><td>{data['college']}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Department:</td><td>{data['department']}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Year:</td><td>{data['year']}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold;">Start Date:</td><td>{data['start_date']}</td></tr>
            </table>
            <a href="https://aitechpulze.com/portal/admin"
               style="display:block; background:linear-gradient(135deg, #10b981, #059669); color:white; text-align:center; padding:14px; border-radius:10px; text-decoration:none; font-weight:700; font-size:16px;">
               Review Application on Dashboard →
            </a>
          </div>
        </div>
        """
        })
        print(f"[EMAIL] Admin alert sent for {data['email']}", flush=True)
    except Exception as e:
        print(f"[EMAIL] Failed to send admin alert: {e}", flush=True)


def send_student_welcome_email(full_name, email, domain):
    get_resend_client()
    try:
        resend.Emails.send({
            "from": "AiTechPulze <info@aitechpulze.com>",
            "to": [email],
            "subject": "🎓 Welcome to AiTechPulze - Internship Application Received!",
            "html": f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #334155;">
          <div style="background: linear-gradient(135deg, #2563EB, #1d4ed8); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 22px;">👋 Welcome to AiTechPulze!</h1>
            <p style="color: rgba(255,255,255,0.85); margin-top: 8px;">Internship Application Under Review</p>
          </div>
          <div style="background: #f8fafc; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e2e8f0; line-height: 1.6;">
            <p style="font-size: 16px; color: #1e293b;">Dear <strong>{full_name}</strong>,</p>
            <p>Thank you for submitting your internship application for the <strong>{domain}</strong> cohort.</p>
            <div style="background: white; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <h4 style="margin: 0 0 8px; color: #1e293b;">📌 Next Steps:</h4>
              <p style="margin: 0; font-size: 13px; color: #64748b;">
                Our team is reviewing your application.
                <strong>Once approved, you will receive your Student Portal login credentials via email.</strong>
              </p>
            </div>
            <p>Questions? Reach us at <a href="mailto:info@aitechpulze.com">info@aitechpulze.com</a></p>
            <p style="margin-top: 24px; color: #94a3b8; font-size: 12px;">Best regards,<br/><strong>The AiTechPulze Team</strong></p>
          </div>
        </div>
        """
        })
        print(f"[EMAIL] Welcome email sent to {email}", flush=True)
    except Exception as e:
        print(f"[EMAIL] Failed to send welcome email: {e}", flush=True)
