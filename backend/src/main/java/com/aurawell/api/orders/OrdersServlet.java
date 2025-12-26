package com.aurawell.api.orders;

import com.aurawell.models.Cart;
import com.aurawell.models.Order;
import com.aurawell.models.OrderItem;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@WebServlet(name = "OrdersServlet", urlPatterns = "/api/orders")
public class OrdersServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    // GET /api/orders - View user order history
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            List<Order> userOrders = dataManager.getOrdersByUserId(userId);
            resp.getWriter().write(gson.toJson(userOrders));
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    //place new order from current cart
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            Cart cart = dataManager.getCartByUserId(userId);

            if (cart.getItems().isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\": \"Cart is empty\"}");
                return;
            }

            //read shipping address from request
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Order orderRequest = gson.fromJson(body, Order.class);

            //create order items from current cart
            List<OrderItem> orderItems = cart.getItems().stream()
                .map(item -> {
                    var product = dataManager.getProductById(item.getProductId()).get();
                    return new OrderItem(item.getProductId(), product.getName(), item.getQuantity(), product.getPrice());
                }).collect(Collectors.toList());

            double total = orderItems.stream().mapToDouble(i -> i.getPriceAtPurchase() * i.getQuantity()).sum();
            Order newOrder = new Order(userId, orderItems, total, orderRequest.getShippingAddress());

            //place order(deducts stock and saves)
            Optional<Order> placedOrder = dataManager.placeOrder(newOrder);

            if (placedOrder.isPresent()) {
                cart.clear(); // Clear cart after successful checkout
                dataManager.saveCarts();
                resp.setStatus(HttpServletResponse.SC_CREATED);
                resp.getWriter().write(gson.toJson(placedOrder.get()));
            } else {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\": \"Insufficient stock for some items\"}");
            }
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}

