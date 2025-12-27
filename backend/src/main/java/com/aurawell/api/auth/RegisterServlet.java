package com.aurawell.api.auth;

import com.aurawell.models.User;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.stream.Collectors;

public class RegisterServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        try {
            // Read incoming JSON body
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            User newUser = gson.fromJson(body, User.class);

            // Use DataManager to save the user
            java.util.Optional<User> registered = dataManager.register(newUser);

            if (registered.isPresent()) {
                User user = registered.get();
                
                // Auto-login: Create session immediately after successful signup
                HttpSession session = req.getSession();
                session.setAttribute("userId", user.getId());
                session.setAttribute("userRole", user.getRole());
                
                // Return user data (hide password)
                user.setPassword(null);
                
                resp.setStatus(HttpServletResponse.SC_CREATED);
                resp.getWriter().write("{\"success\": true, \"message\": \"User created successfully\", \"user\": " + gson.toJson(user) + "}");
            } else {
                resp.setStatus(HttpServletResponse.SC_CONFLICT);
                resp.getWriter().write("{\"success\": false, \"message\": \"Email already exists\"}");
            }
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write("{\"success\": false, \"error\": \"" + e.getMessage() + "\"}");
        }
    }
}

