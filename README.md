# Mini LMS (MERN Stack)

A mini Learning Management System built with MongoDB, Express, React, and Node.js.

## Features

### Backend
- Auth: `POST /api/register`, `POST /api/login` (JWT)
- Courses: `GET /api/courses`, `POST /api/courses` (admin-only)
- Enrollments: `POST /api/enroll/:courseId`, `GET /api/enroll/my-courses`
- MongoDB models: Users, Courses, Enrollments
- Input validation and centralized error handling

### Frontend
- Login / Signup pages
- Course listing (enroll from UI)
- Enrolled courses page
- Admin course creation page
- Axios + React Context API

## Project Structure

```text
backend/
frontend/
```

## Tech Stack

- MongoDB + Mongoose
- Express.js
- React (Vite)
- Node.js
- Axios
- JWT

## Setup Instructions (Local)

### Prerequisites
- Node.js installed
- MongoDB running locally OR a MongoDB Atlas connection string

### 1) Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` from `backend/.env.example` and set values:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mini-lms
JWT_SECRET=replace_with_a_secure_secret
JWT_EXPIRES_IN=7d
# Optional (for browser requests)
# CORS_ORIGIN=http://localhost:5173
```

Run backend:

```bash
npm run dev
```

Backend health check:
- `GET http://localhost:5000/api/health`

### 2) Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

## Demo Flow

1. Signup as a student and login
2. Browse courses
3. Enroll in a course
4. View enrolled courses in `My Learning`
5. Signup/login as an admin
6. Create courses from the Admin page

## Deployment

### Option A (Recommended): Single Render service (backend serves frontend)

This repo includes a `render.yaml` that builds the Vite frontend and serves it from the Express backend in production.

On Render, set these environment variables:
- `MONGODB_URI`
- `JWT_SECRET`
- (Optional) `CORS_ORIGIN` (comma-separated). Not required when frontend is served by the backend.

After deploy:
- App: `https://<your-render-service>/`
- API health: `https://<your-render-service>/api/health`

### Option B: Separate frontend hosting (Vercel/Netlify) + Render backend

If you host the frontend separately, set this build-time env var on the frontend host:
- `VITE_API_BASE_URL=https://<your-render-service>/api`
