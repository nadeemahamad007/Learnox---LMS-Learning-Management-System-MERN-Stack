# Mini LMS - MERN Stack

A mini Learning Management System built with MongoDB, Express, React, and Node.js. The application supports authentication, course publishing, and student enrollments with a clean API-driven flow.

## Live Links

- Frontend (Vercel): `https://learnox-lms-learning-management-sys.vercel.app`
- Backend (Render): `https://learnox-lms-learning-management-system.onrender.com`
- API Health Check: `https://learnox-lms-learning-management-system.onrender.com/api/health`

## Deploy (Get A Public Link For LinkedIn)

You will get a shareable live URL after deploying the backend + frontend.

### 1) Database (MongoDB Atlas)
1. Create a free cluster on MongoDB Atlas.
2. Create a database user + password.
3. Allow network access (add `0.0.0.0/0` for quick testing).
4. Copy the connection string and set it as `MONGODB_URI` on your backend host.

### 2) Backend Hosting (Render)
1. Push this repo to GitHub.
2. On Render: New → "Web Service" → connect your repo.
3. Root directory: `backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Environment variables:
   - `MONGODB_URI` = your Atlas connection string
   - `JWT_SECRET` = any long random string
   - `CORS_ORIGIN` = your frontend URL (example: `https://learnox-lms-learning-management-sys.vercel.app`)

After deploy, you’ll get a backend URL like: `https://learnox-backend.onrender.com`

### 3) Frontend Hosting (Vercel Or Netlify)

Set this environment variable on your frontend host:
- `VITE_API_BASE_URL` = `https://YOUR-BACKEND-URL/api` (example: `https://learnox-lms-learning-management-system.onrender.com/api`)

Your final shareable link is the frontend URL (Vercel/Netlify). Share that link on LinkedIn.

## Implemented Requirements

### Backend
- `POST /api/register` for user signup
- `POST /api/login` for user login with JWT authentication
- `GET /api/courses` to fetch all available courses
- `POST /api/courses` to add a new course as an admin user
- `POST /api/enroll/:courseId` to enroll in a course
- MongoDB collections for users, courses, and enrollments
- Request validation and centralized error handling

### Frontend
- Login page
- Signup page
- Course listing page
- Enrolled courses page
- Admin course creation page
- Axios for API requests
- React Context API for authentication state

## Project Structure

```text
backend/
frontend/
```

## Tech Stack

- MongoDB
- Express.js
- React
- Node.js
- Axios
- JWT
- Mongoose

## Setup Instructions

### Backend

1. Move to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`
4. Update the environment variables if needed:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/mini-lms
   JWT_SECRET=replace_with_a_secure_secret
   JWT_EXPIRES_IN=7d
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Move to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` from `.env.example`
4. Confirm the API base URL:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
5. Start the frontend:
   ```bash
   npm run dev
   ```

## Demo Flow

1. Register as a student and log in
2. View all available courses
3. Enroll in a course
4. Open `My Learning` to view enrolled courses
5. Register as an admin and log in
6. Use the `Add Course` page to create new courses from the UI

## API Summary

- `POST /api/register`
- `POST /api/login`
- `GET /api/courses`
- `POST /api/courses`
- `POST /api/enroll/:courseId`
- `GET /api/enroll/my-courses`

## Notes

- MongoDB must be running locally or be available through a cloud connection string
- Admin users can create courses from the frontend UI and the protected API
- This implementation uses Context API to keep state management lightweight and readable
- For local dev + production, you can set `CORS_ORIGIN` as a comma-separated list, e.g. `https://learnox-lms-learning-management-sys.vercel.app,http://localhost:5173`
