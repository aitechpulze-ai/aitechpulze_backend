import gspread
from google.oauth2.service_account import Credentials
import json, os
from datetime import datetime

def sync_to_sheets(data: dict):
    creds_json = os.getenv('GOOGLE_SHEETS_CREDENTIALS_JSON', '').strip()
    if not creds_json:
        print('[SHEETS] No credentials — skipping Google Sheets sync.')
        return

    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    creds = Credentials.from_service_account_info(json.loads(creds_json), scopes=scope)
    client = gspread.authorize(creds)

    sheet_id = os.getenv('GOOGLE_SHEETS_SPREADSHEET_ID')
    sheet = client.open_by_key(sheet_id).sheet1

    # Add headers if sheet is empty
    existing = sheet.get_all_values()
    if not existing:
        sheet.append_row([
            'Timestamp', 'Name', 'Email', 'Phone', 'Domain', 'Duration',
            'College', 'Year', 'Department', 'Start Date', 'End Date', 'Resume URL', 'Status'
        ])

    sheet.append_row([
        datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S'),
        data.get('full_name', ''),
        data.get('email', ''),
        data.get('phone', ''),
        data.get('domain', ''),
        data.get('duration', ''),
        data.get('college', ''),
        data.get('year', ''),
        data.get('department', ''),
        data.get('start_date', ''),
        data.get('end_date', ''),
        data.get('resume_url', ''),
        'Pending',
    ])
    print(f"[SHEETS] Synced {data.get('full_name', '')} to Google Sheets")
