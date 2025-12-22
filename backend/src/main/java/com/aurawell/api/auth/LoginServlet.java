package com.aurawell.api.auth;

import com.aurawell.models.User;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet(name = "LoginServlet", urlPatterns = "/api/auth/login")
public class LoginServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        try {
            String requestBody = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            User loginRequest = gson.fromJson(requestBody, User.class);

            User user = dataManager.login(loginRequest.getEmail(), loginRequest.getPassword());

            if (user != null) {
                HttpSession session = req.getSession();
                session.setAttribute("userId", user.getId());
                
                user.setPassword(null); // Security
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.add("user", gson.toJsonTree(user));
                resp.getWriter().write(gson.toJson(jsonResponse));
            } else {
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write("{\"success\": false, \"message\": \"Invalid credentials\"}");
            }
        } catch (Exception e) {
            resp.setStatus(500);
            resp.getWriter().write("{\"error\": \"Server error\"}");
        }
    }
}