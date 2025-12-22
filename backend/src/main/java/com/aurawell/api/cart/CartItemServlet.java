package com.aurawell.api.cart;

import com.aurawell.models.Cart;
import com.aurawell.services.DataManager;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;

@WebServlet(name = "CartItemServlet", urlPatterns = "/api/cart/*")
public class CartItemServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();

    // DELETE /api/cart/{productId} - Remove item
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);
        String pathInfo = req.getPathInfo();

        if (session != null && session.getAttribute("userId") != null && pathInfo != null) {
            String userId = (String) session.getAttribute("userId");
            String productId = pathInfo.substring(1); // Remove the "/"

            Cart cart = dataManager.getCartByUserId(userId);
            cart.removeItem(productId);
            dataManager.saveCarts();
            
            resp.setStatus(HttpServletResponse.SC_OK);
        } else {
            resp.setStatus(401);
        }
    }
}