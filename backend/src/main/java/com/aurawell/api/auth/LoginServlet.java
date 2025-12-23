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

            //verify using your DataManager
            User user = dataManager.login(loginRequest.getEmail(), loginRequest.getPassword());

            if (user != null) {
                //create session
                HttpSession session = req.getSession();
                session.setAttribute("userId", user.getId());

                //convert to JsonObject
                // We do NOT call user.setPassword(null) anymore!
                JsonObject userJson = gson.toJsonTree(user).getAsJsonObject();
                userJson.remove("password"); 
                
                //build a clean JSON response
                JsonObject jsonResponse = new JsonObject();
                jsonResponse.addProperty("success", true);
                jsonResponse.add("user", userJson);
                resp.getWriter().write(gson.toJson(jsonResponse));
            } else {
                //return 401 Unauthorized if user login fails
                resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                resp.getWriter().write("{\"success\": false, \"message\": \"Invalid email or password\"}");
            }
        } catch (Exception e) {
            e.printStackTrace(); 
            resp.setStatus(500);
            JsonObject errorObj = new JsonObject();
            errorObj.addProperty("success", false);
            errorObj.addProperty("message", "Server error: " + e.getMessage());
            resp.getWriter().write(gson.toJson(errorObj));
        }
    }
}