from flask import Flask, send_from_directory
from models import db
from routes import recipe_routes
from flask_cors import CORS
import os

app = Flask(__name__)

# ✅ Proper CORS configuration to allow requests from the frontend
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipe_book.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Image upload configuration (ready for future image upload support)
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Initialize database
db.init_app(app)

with app.app_context():
    db.create_all()

# Register API routes
app.register_blueprint(recipe_routes)

# Serve uploaded images (if needed later)
@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))


