# LMS Project (Frontend + Backend)

## Prereqs
- Node.js 18+ recommended

## Dev (recommended)
1) Start backend:
   - `cd backend`
   - `npm install`
   - `npm run dev` (listens on `http://localhost:5000`)

2) Start frontend (Vite):
   - `cd frontend`
   - `npm install`
   - `npm run dev`

Vite is configured to proxy `/api/*` to the backend in dev.

## Production-style (serve frontend from backend)
1) Build frontend:
   - `cd frontend`
   - `npm install`
   - `npm run build`

2) Run backend:
   - `cd backend`
   - `npm install`
   - `npm start`

The backend serves `frontend/dist` if it exists, and also exposes API routes under `/api`.

