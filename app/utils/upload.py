import os
import uuid
import cloudinary.uploader
from flask import current_app, request

def upload_file_to_cloudinary_or_local(file_storage, folder='aitechpulze', resource_type='auto'):
    """
    Attempts to upload the file to Cloudinary.
    If it fails, saves it locally to the Flask app static/uploads directory
    and returns the local serving URL.
    """
    if not file_storage or not file_storage.filename:
        return None

    # 1. Attempt Cloudinary Upload
    try:
        file_storage.seek(0)
        file_bytes = file_storage.read()
        
        print(f"[UPLOAD] Attempting Cloudinary upload: {file_storage.filename}")
        result = cloudinary.uploader.upload(
            (file_storage.filename, file_bytes),
            folder=folder,
            resource_type=resource_type
        )
        url = result.get('secure_url')
        if url:
            print(f"[UPLOAD] Cloudinary success: {url}")
            return url
    except Exception as e:
        print(f"[UPLOAD] Cloudinary failed. Error: {e}. Falling back to local storage...")

    # 2. Local Storage Fallback
    try:
        # Create static/uploads directory
        static_folder = os.path.join(current_app.root_path, 'static', 'uploads')
        os.makedirs(static_folder, exist_ok=True)

        # Generate a unique secure filename to prevent collisions
        ext = os.path.splitext(file_storage.filename)[1]
        unique_name = f"{uuid.uuid4().hex}{ext}"
        filepath = os.path.join(static_folder, unique_name)

        # Write file bytes locally
        file_storage.seek(0)
        with open(filepath, 'wb') as f:
            f.write(file_storage.read())

        # Generate local serving URL
        local_url = f"{request.url_root.rstrip('/')}/static/uploads/{unique_name}"
        print(f"[UPLOAD] Local storage fallback success: {local_url}")
        return local_url
    except Exception as local_err:
        print(f"[UPLOAD] Critical: Both Cloudinary and local storage failed! Error: {local_err}")
        return None
