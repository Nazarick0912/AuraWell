package com.aurawell.api.auth;

import com.aurawell.models.User;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.stream.Collectors;

public class LoginServlet extends HttpServlet {
    private final Gson gson = new Gson();
    private final DataManager dataManager = DataManager.getInstance();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 1. Setup Response Headers
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            // 2. Read JSON Body from React
            String requestBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            User loginRequest = gson.fromJson(requestBody, User.class);

            // 3. Validation Logic
            if (loginRequest == null || loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(gson.toJson(createResponse(false, "Email and password are required")));
                return;
            }

            // 4. Check Credentials
            User user = dataManager.login(loginRequest.getEmail(), loginRequest.getPassword());

            if (user != null) {
                // SUCCESS: Create Session
                HttpSession session = req.getSession();
                session.setAttribute("userId", user.getId());
                session.setAttribute("userRole", user.getRole());

                // Return User Data (Hide password first!)
                user.setPassword(null); 
                
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.addProperty("message", "Login successful");
                jsonResponse.add("user", gson.toJsonTree(user));

                resp.setStatus(HttpServletResponse.SC_OK);
                resp.getWriter().write(gson.toJson(jsonResponse));
            } else {
                // FAILURE
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write(gson.toJson(createResponse(false, "Invalid email or password")));
            }

        } catch (Exception e) {
            e.printStackTrace();
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(gson.toJson(createResponse(false, "Server error")));
        }
    }

    // Helper method to make clean JSON responses
    private JsonObject createResponse(boolean success, String message) {
        JsonObject response = new JsonObject();
        response.addProperty("success", success);
        response.addProperty("message", message);
        return response;
    }
}
