Just copy everything between the lines and paste into README.md.

# 🤖 AI Chatbot Platform (Django + React + LLM)

This project is a full-stack **AI Chatbot Platform** that allows users to register, log in, create projects (AI agents), add system prompts, and chat with an AI model.

- Backend: Django + Django REST Framework + JWT
- Frontend: React (Vite)
- AI: OpenRouter (Free LLM models)

---

## 📦 System Requirements

```bash
Python 3.9+
Node.js 18+
npm 9+
Git


Check versions:

python --version
node --version
npm --version
git --version

📂 Project Structure
CHATBOT_PLATFORM/
├── backend/
│   ├── manage.py
│   ├── core/
│   ├── accounts/
│   ├── projects/
│   ├── chat/
│   └── requirements.txt
│
├── chatbot-frontend/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md

⚙️ Backend Setup (Django)
1. Go to backend directory
cd backend

2. Create virtual environment
python -m venv venv

Activate virtual environment

Mac / Linux

source venv/bin/activate


Windows

venv\Scripts\activate

3. Install backend dependencies
pip install -r requirements.txt


If requirements.txt is missing:

pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install requests

4. Backend configuration

Open:

backend/core/settings.py


Add OpenRouter API key:

OPENROUTER_API_KEY = "sk-or-xxxxxxxxxxxxxxxxxxxx"


Enable CORS:

INSTALLED_APPS += ['corsheaders']

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOW_ALL_ORIGINS = True

5. Run migrations
python manage.py makemigrations
python manage.py migrate

6. Start backend server
python manage.py runserver


Backend URL:

http://127.0.0.1:8000

🎨 Frontend Setup (React + Vite)
1. Go to project root
cd ..

2. Create Vite + React app
npm create vite@latest chatbot-frontend


Choose:

Framework → React
Variant   → JavaScript

3. Go to frontend directory
cd chatbot-frontend

4. Install frontend dependencies
npm install
npm install react-markdown

5. Start frontend server
npm run dev


Frontend URL:

http://localhost:5173

🔐 Authentication API Usage
Register
POST http://127.0.0.1:8000/api/register/

{
  "email": "user@example.com",
  "username": "user1",
  "password": "password123"
}

Login
POST http://127.0.0.1:8000/api/login/

{
  "email": "user@example.com",
  "password": "password123"
}


Response:

{
  "access": "<JWT_TOKEN>"
}

📁 Project & Chat API Usage
Get projects
GET /api/projects/
Authorization: Bearer <JWT_TOKEN>

Create project
POST /api/projects/
Authorization: Bearer <JWT_TOKEN>

{
  "name": "Python Tutor",
  "description": "Teaches Python"
}

Add system prompt
POST /api/projects/1/prompts/
Authorization: Bearer <JWT_TOKEN>

{
  "title": "System",
  "content": "You are a helpful Python tutor"
}

Chat with AI
POST /api/projects/1/chat/
Authorization: Bearer <JWT_TOKEN>

{
  "message": "Explain decorators in Python with example"
}

▶️ Run Application (Final)
Terminal 1 – Backend
cd backend
source venv/bin/activate
python manage.py runserver

Terminal 2 – Frontend
cd chatbot-frontend
npm run dev


Open in browser:

http://localhost:5173


Register a user

Login

Create a project

Add system prompt

Ask AI a question

Show formatted AI response

👨‍💻 Author

Nandan Bhandary



