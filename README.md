# BoundaryBox

**Secure the match like Surya did!**

BoundaryBox is a unique, cricket-inspired secure file upload and sharing app. Upload, share, and manage your files with expiring links and a modern, Indian cricket blue UI.

---

## 🚀 Features
- User registration & login (JWT authentication)
- Secure file upload, download, and sharing (with expiring links)
- Modern, responsive React frontend with cricket branding
- Toast notifications and animated feedback
- Dockerized backend (Spring Boot) and frontend (React)

---

## 🏗️ Project Structure
```
backend/    # Spring Boot Java backend
frontend/   # React frontend (Material UI, cricket theme)
```

---

## ⚡ Quick Start (Local)

### 1. Backend
```bash
cd backend
# Build the JAR
./mvnw clean package
# Run the app
java -jar target/*.jar
```

### 2. Frontend
```bash
cd frontend
npm install
npm start
```

- Backend: http://localhost:8080
- Frontend: http://localhost:3000

---

## 🐳 Run with Docker

### Backend
```bash
docker build -t boundarybox-backend ./backend
docker run -p 8080:8080 boundarybox-backend
```

### Frontend
```bash
docker build -t boundarybox-frontend ./frontend
docker run -p 80:80 boundarybox-frontend
```

---

## 🔗 API Endpoints (Backend)
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login and get JWT
- `POST /api/files/upload` — Upload file (auth required)
- `GET /api/files` — List user files (auth required)
- `GET /api/files/download/{id}` — Download file (auth required)
- `POST /api/files/share/{id}` — Generate share link (auth required)
- `GET /api/files/shared/{token}` — Download shared file (public)

---

## 🎨 Branding
- Name: **BoundaryBox**
- Tagline: *Secure the match like Surya did!*
- Theme: Indian cricket blue, sky blue, orange accents

---

## 🙌 Credits
Made with ❤️ for cricket fans and champions everywhere.

