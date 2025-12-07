# AuraWell Backend

Java servlet backend that parses input, validates it, and returns JSON to the frontend.

## Role
- Validate and coerce all requests.
- Serve images via `ImageServlet`.
- Provide typed contracts consumed by `frontend/src/services/api.ts`, `AuthContext`, and `CartContext`; avoid `any`.
- Expose APIs under `/api` on port `9090` by default.

## Start
```
cd backend
mvn install
mvn tomcat7:run
```
Runs at `http://localhost:9090/api`