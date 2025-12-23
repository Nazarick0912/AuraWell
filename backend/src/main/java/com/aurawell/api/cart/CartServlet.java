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

    //fetch current user's cart
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            Cart cart = dataManager.getCartByUserId(userId);
            resp.getWriter().write(gson.toJson(cart));
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"success\": false, \"message\": \"Not logged in\"}");
        }
    }

    //add item to cart
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            
            //read incoming item data
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            CartItem newItem = gson.fromJson(body, CartItem.class);

            //update the cart logic
            Cart cart = dataManager.getCartByUserId(userId);
            cart.addItem(newItem.getProductId(), newItem.getQuantity());
            dataManager.saveCarts();

            resp.getWriter().write("{\"success\": true, \"message\": \"Item added\"}");
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"success\": false, \"message\": \"Please login first\"}");
        }
    }

    //remove specific item from cart
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            String productId = req.getParameter("productId"); // Get ID from query string

            if (productId != null) {
                dataManager.removeItemFromCart(userId, productId);
                resp.getWriter().write("{\"success\": true, \"message\": \"Item removed\"}");
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"success\": false, \"message\": \"Missing product ID\"}");
            }
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            resp.getWriter().write("{\"success\": false, \"message\": \"Not authorized\"}");
        }
    }
}