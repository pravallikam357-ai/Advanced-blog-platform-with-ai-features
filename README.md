Advanced Blog Platform with User Authentication & AI Features
A modern full-stack blog application built using React, Node.js, and Python-based AI features, designed to provide a seamless writing, editing, and publishing experience.
This platform allows users to register, log in, create blogs, edit them, use AI tools, and manage content efficiently.
🚀 Features
🔐 User Authentication
Secure user registration & login
JWT-based authentication
Role-based access control
Password encryption
📝 Blog Management
Create, edit, delete blog posts
Rich text editor for blog content
Image upload support
Auto-save drafts (optional)
🤖 AI-Powered Features (Python)
AI blog assistant (content generation)
Grammar & tone improvement
Auto-summarization of long articles
Title & keyword suggestions
SEO optimization suggestions
🌐 Frontend (React)
Responsive UI
Dynamic routing
State management (Context API / Redux)
API integration with backend
🖥 Backend (Node.js)
REST APIs for authentication, blogs, users
Middleware for validation & security
MongoDB database integration
Token verification for protected routes
#screenshots
###HOME PAGE
<img width="1903" height="878" alt="Screenshot 2026-05-12 181329" src="https://github.com/user-attachments/assets/04dc84b5-e187-44b2-9f0b-282220147d2b" />
#LOGIN PAGE
<img width="791" height="486" alt="Screenshot 2026-05-12 181702" src="https://github.com/user-attachments/assets/737e07a7-9273-41c0-89b1-f3f163a83ae8" />
#CREATEBLOG PAGE
<img width="1763" height="479" alt="Screenshot 2026-05-12 181806" src="https://github.com/user-attachments/assets/e8543f22-64a1-44ce-bdc1-fbb54408590b" />
#EDIT OR UPDATE BLOG
<img width="916" height="227" alt="Screenshot 2026-05-12 181917" src="https://github.com/user-attachments/assets/ae799eb1-9dd5-4d36-84d1-3a1fb6b278e2" />

📁 Folder Structure

project-root/
│
├── client/                # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/                # Node.js backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── ai/                    # Python-based AI features
│   ├── main.py
│   └── helpers/
│
├── .gitignore
├── README.md
└── package.json
🛠️ Tech Stack
Frontend
React.js
HTML, CSS, JavaScript
Axios
Tailwind / Material UI (optional)
Backend
Node.js
Express.js
MongoDB / Mongoose
JWT Authentication
Bcrypt for password hashing
AI
Python
Transformers / GPT / NLTK / SpaCy (your choice)
Flask / FastAPI (for API endpoints)
⚙️ Installation & Setup
1️⃣ Clone the Repository

git clone <your-repo-url>
cd project-folder
2️⃣ Install Client Dependencies

cd client
npm install
npm start
3️⃣ Install Server Dependencies

cd ../server
npm install
npm start
4️⃣ AI Service Setup
Create a Python virtual environment and install dependencies:

cd ../ai
pip install -r requirements.txt
python main.py
5️⃣ Environment Variables
Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_secret_key
AI_API_URL=http://localhost:5000
🎯 Future Enhancements
AI-powered plagiarism checker
Multi-user admin panel
Email verification & password reset
Comment & like system
Search & filtering
Dark mode UI
❤️ Contributions
Pull requests are welcome!
Please open an issue for major changes so we can discuss them first.
