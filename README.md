# AuraWell

This repo has `backend/` (Java servlets) and `frontend/` (React + Vite).

## Data parsing roles
1) **Backend**: receives input, validates/coerces, and returns JSON that matches `API_PLAN.md`. It also serves images and owns the typed API client plus `AuthContext`/`CartContext` hydration so the UI starts with real data.
2) **Frontend**: focuses on UI; renders loading/empty/error/success states using the typed data/hooks provided by the backend-owned wiring. 

## Start the servers
**Backend**
```
cd backend
mvn install
mvn tomcat7:run
```
Serves at `http://localhost:9090/api`.

**Frontend**
```
cd frontend
npm install
npm run dev
```
By default calls `http://localhost:9090/api`; set `VITE_API_URL` to override.