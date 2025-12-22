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

    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
        User newUser = gson.fromJson(body, User.class);

        //Call register method from datamanager
        java.util.Optional<User> registered = dataManager.register(newUser);

        if (registered.isPresent()) {
            HttpSession session = req.getSession();
            session.setAttribute("userId", registered.get().getId());
            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write(gson.toJson(registered.get()));
        } else {
            resp.setStatus(HttpServletResponse.SC_CONFLICT);
            resp.getWriter().write("{\"error\": \"Email already exists\"}");
        }
    }
}