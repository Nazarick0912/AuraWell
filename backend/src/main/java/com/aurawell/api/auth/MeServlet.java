package com.aurawell.api.auth;

import com.aurawell.models.User;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet(name = "MeServlet", urlPatterns = "/api/auth/me")
public class MeServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            dataManager.getUserById(userId).ifPresentOrElse(user -> {
                user.setPassword(null);
                try { resp.getWriter().write(gson.toJson(user)); } catch (IOException ignored) {}
            }, () -> resp.setStatus(401));
        }
        else {
            resp.setStatus(401);
        }
    }
}

