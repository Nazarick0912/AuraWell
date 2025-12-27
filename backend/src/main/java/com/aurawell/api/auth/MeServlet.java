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

public class MeServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        HttpSession session = req.getSession(false);

        if (session == null || session.getAttribute("userId") == null) {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write(createErrorResponse("Not authenticated"));
            return;
        }

        String userId = (String) session.getAttribute("userId");
        var userOpt = dataManager.getUserById(userId);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(null);
            
            JsonObject jsonResponse = new JsonObject();
            jsonResponse.addProperty("success", true);
            jsonResponse.add("user", gson.toJsonTree(user));
            
            resp.getWriter().write(gson.toJson(jsonResponse));
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write(createErrorResponse("User not found"));
        }
    }

    private String createErrorResponse(String message) {
        JsonObject response = new JsonObject();
        response.addProperty("success", false);
        response.addProperty("message", message);
        return gson.toJson(response);
    }
}

