# FAQs-Management
FAQ Management System with Multilingual Support

React.js
Quill.js
Node.js
Express.js
MongoDB
Redis

A full-stack application for managing FAQs with real-time translation support (English, Hindi, Bengali) and Redis caching.

Features
🌐 Multilingual FAQ management (EN/HI/BN)

✍️ Rich text editor for answers

⚡ Redis caching for fast responses

🔄 Automatic translation using Google Cloud API

🐳 Dockerized development environment

📱 Responsive UI with animations

Screenshots

FAQ Interface
<img width="1432" alt="Screenshot 2025-02-02 at 12 42 04 PM" src="https://github.com/user-attachments/assets/b2a2637f-5962-4a5b-bc9c-eca714f52d30" />

FAQ management interface with language selector
<img width="1435" alt="Screenshot 2025-02-02 at 12 43 04 PM" src="https://github.com/user-attachments/assets/3221bf0c-6e2b-45c5-8d27-5f1f1e310221" />

Translation Demo
<img width="1413" alt="Screenshot 2025-02-02 at 12 48 25 PM" src="https://github.com/user-attachments/assets/5e674523-01ea-4ae0-9462-6476cfd5c372" />
<img width="1413" alt="Screenshot 2025-02-02 at 12 49 13 PM" src="https://github.com/user-attachments/assets/bbdfb86b-4bf7-44a0-a8d0-f947bd2ffb61" />

# Installation Prerequisites

Docker & Docker Compose

# Google Cloud API key (Translation API)

Node.js 18+ (for manual setup)

# Using Docker (Recommended)

# git clone https://github.com/abdulbaqui17/FAQs-Management.git

cd faqs-management

# Set up environment variables
you can directly past you key in index.js file line 14 ( const translate = new Translate({ key: "" }); ) or create touch .env in backend folder

# docker-compose up -d (or) docker-compose up --build

client http://localhost:5173/

server http://localhost:3000/

# Manual Setup
# Backend
cd backend
npm install
echo "MONGO_URL=mongodb://localhost:27017/faqs" >> .env start mongodb instance docker or locally
echo "REDIS_URL=redis://localhost:6379" >> .env redis instance docker or locally
echo "GOOGLE_TRANSLATE_KEY=your_api_key" >> .env get api key from google cloud console
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev

# API Documentation
Create FAQ

POST http://localhost:3000/api/faqs

{
  "question": "How do I reset my password?",
  "answer": "<p>Visit the password reset page...</p>"
}

# Get FAQs
GET http://localhost:3000/api/faqs

GET http://localhost:3000/api/faqs?lang=hi

GET http://localhost:3000/api/faqs?lang=bn

Technology Stack
Frontend:

React + Vite

Quill Rich Text Editor

Framer Motion animations

Backend:

Express.js

Google Cloud Translation API

Redis caching

MongoDB

Infrastructure:

Docker Compose

Multi-container architecture

