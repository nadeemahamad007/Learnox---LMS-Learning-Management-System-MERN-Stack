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
   > Note (Demo/Test): The signup form allows selecting `role=admin` so evaluators can test the admin-only course creation flow easily. In a production app, admin access should be granted by the system (not chosen during signup).

6. Signup/login as an admin
7. Create courses from the Admin page


## Screenshot

<img width="929" height="814" alt="Screenshot 2026-04-12 153912" src="https://github.com/user-attachments/assets/3b9ae1a0-e900-4022-a1c6-6ca09aa656eb" />

<img width="929" height="814" alt="image" src="https://github.com/user-attachments/assets/fbbee2fc-1f31-4d2e-ae7c-f4be829aac4d" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154056" src="https://github.com/user-attachments/assets/a0674446-770f-42e4-b22c-f7e8e37814a1" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154246" src="https://github.com/user-attachments/assets/144ca671-a67e-471b-8bff-04a6b5bf1e9f" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154256" src="https://github.com/user-attachments/assets/5b6917e2-cafe-4bf8-98f4-cdc846376be8" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154312" src="https://github.com/user-attachments/assets/4a1d7705-141d-40dc-b9b5-7fbe5579d6b8" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154319" src="https://github.com/user-attachments/assets/dbb4130b-272b-44fa-939d-4e6875dc6eb7" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154326" src="https://github.com/user-attachments/assets/73e0f54f-6b2e-457b-a03e-9867abfa2f46" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154225" src="https://github.com/user-attachments/assets/db619001-553f-4332-b1d8-8571e5283f45" />

<img width="929" height="814" alt="Screenshot 2026-04-12 154332" src="https://github.com/user-attachments/assets/02a4884a-1779-42ec-be6f-42bcb22b0032" />


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
