package com.aurawell.api.cart;

import com.aurawell.models.Cart;
import com.aurawell.models.CartItem;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.stream.Collectors;

@WebServlet(name = "CartServlet", urlPatterns = "/api/cart")
public class CartServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    // GET /api/cart - Get current user's cart
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            Cart cart = dataManager.getCartByUserId(userId);
            resp.getWriter().write(gson.toJson(cart));
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    // POST /api/cart - Add item to cart
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            CartItem newItem = gson.fromJson(body, CartItem.class);

            Cart cart = dataManager.getCartByUserId(userId);
            cart.addItem(newItem.getProductId(), newItem.getQuantity());
            dataManager.saveCarts();

            resp.getWriter().write("{\"success\": true, \"message\": \"Item added\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}