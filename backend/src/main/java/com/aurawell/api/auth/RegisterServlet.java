package com.aurawell.api.auth;

import com.aurawell.models.User;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet(name = "RegisterServlet", urlPatterns = "/api/auth/register")
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
                // Auto-login: Create session immediately after successful signup
                HttpSession session = req.getSession();
                session.setAttribute("userId", registered.get().getId());
                
                resp.setStatus(HttpServletResponse.SC_CREATED);
                resp.getWriter().write("{\"success\": true, \"message\": \"User created successfully\"}");
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

