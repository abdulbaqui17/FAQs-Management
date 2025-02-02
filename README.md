# FAQ Management System with Multilingual Support

![React](https://img.shields.io/badge/React-18-blue)
![Express](https://img.shields.io/badge/Express-4.18-green)
![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)
![Redis](https://img.shields.io/badge/Redis-7.2-red)

A full-stack application for managing FAQs with real-time translation support (English, Hindi, Bengali) and Redis caching.

## Features

- 🌐 Multilingual FAQ management (EN/HI/BN)
- ✍️ Rich text editor for answers
- ⚡ Redis caching for fast responses
- 🔄 Automatic translation using Google Cloud API
- 🐳 Dockerized development environment
- 📱 Responsive UI with animations

## Screenshots

| Hindi Interface | Bengali Interface |  Bn Api Interface |
|-------------------|-----------------|-------------------|
| <img src="https://github.com/user-attachments/assets/b2a2637f-5962-4a5b-bc9c-eca714f52d30" width="400"> | <img src="https://github.com/user-attachments/assets/3221bf0c-6e2b-45c5-8d27-5f1f1e310221" width="400"> | <img src="https://github.com/user-attachments/assets/5e674523-01ea-4ae0-9462-6476cfd5c372" width="400"> |

## Installation

### Prerequisites
- Docker & Docker Compose
- Google Cloud API key (Translation API)
- Node.js 18+ (for manual setup)

### Using Docker (Recommended)
```bash
git clone https://github.com/abdulbaqui17/FAQs-Management.git
cd FAQs-Management

# Set up environment variables (create .env file in backend folder)
you can directly past you key in index.js file line 14 ( const translate = new Translate({ key: "" }); ) 
echo "GOOGLE_TRANSLATE_KEY=your_api_key" > backend/.env

# Start services
docker-compose up --build -d

# Access endpoints:
# Frontend: http://localhost:5173
# Backend: http://localhost:3000
```
### Manual Setup
Backend:
```bash
cd backend
npm install

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017/faqs" >> .env
echo "REDIS_URL=redis://localhost:6379" >> .env
echo "GOOGLE_TRANSLATE_KEY=your_api_key" >> .env

# Start server
npm run dev
```
### Frontend:
```bash
cd ../frontend
npm install
npm run dev
```
### API Documentation

#### Create FAQ
```bash
POST http://localhost:3000/api/faqs
Content-Type: application/json

{
  "question": "How do I reset my password?",
  "answer": "<p>Visit the password reset page...</p>"
}
```

#### Get FAQs

GET http://localhost:3000/api/faqs
GET http://localhost:3000/api/faqs?lang=hi
GET http://localhost:3000/api/faqs?lang=bn


```
GET http://localhost:3000/api/faqs?lang=hi
[
  {
    "question": "आपका क्या नाम है?",
    "answer": "\u003Cp\u003Emy name is abdul baqui\u003C/p\u003E"
  }
]
```

## Technology Stack
### Frontend:

React + Vite

Quill Rich Text Editor

Framer Motion animations

### Backend:

Express.js

Google Cloud Translation API

Redis caching

MongoDB

### Infrastructure:

Docker Compose

Multi-container architecture

