# AuraWell Frontend

React + TypeScript + Vite UI that consumes the backend.

## Role
- Build layouts and components; show loading/empty/error/success states.
- Use the typed data/hooks provided by backend-owned `src/services/api.ts`, `AuthContext`, and `CartContext`.
- Default API base: `http://localhost:9090/api` (override with `VITE_API_URL`).

## Start
```
cd frontend
npm install
npm run dev
```
Open the printed URL (typically `http://localhost:5173`) with the backend running on 9090.