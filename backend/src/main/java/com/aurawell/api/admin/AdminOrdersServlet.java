package com.aurawell.api.admin;

import com.aurawell.models.Order;
import com.aurawell.models.User;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class AdminOrdersServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    // Valid order statuses
    private static final Set<String> VALID_STATUSES = new HashSet<>(Arrays.asList(
            "pending", "processing", "shipped", "delivered", "cancelled"
    ));

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Check admin access
        if (!isAdmin(req)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write(errorJson("Admin access required"));
            return;
        }

        // Return all orders with customer name
        List<Order> orders = dataManager.getOrders();
        JsonArray ordersWithCustomer = new JsonArray();
        
        for (Order order : orders) {
            JsonObject orderJson = gson.toJsonTree(order).getAsJsonObject();
            
            // Lookup user to get customer name
            Optional<User> userOpt = dataManager.getUserById(order.getUserId());
            if (userOpt.isPresent()) {
                User user = userOpt.get();
                orderJson.addProperty("customerName", user.getFirstName() + " " + user.getLastName());
            } else {
                orderJson.addProperty("customerName", "Unknown Customer");
            }
            
            ordersWithCustomer.add(orderJson);
        }
        
        resp.getWriter().write(gson.toJson(ordersWithCustomer));
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Check admin access
        if (!isAdmin(req)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write(errorJson("Admin access required"));
            return;
        }

        try {
            // Parse request body - expects { orderId, status }
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            JsonObject requestData = gson.fromJson(body, JsonObject.class);

            // Validate orderId
            if (!requestData.has("orderId") || requestData.get("orderId").isJsonNull()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson("Order ID is required"));
                return;
            }
            String orderId = requestData.get("orderId").getAsString();

            // Validate status
            if (!requestData.has("status") || requestData.get("status").isJsonNull()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson("Status is required"));
                return;
            }
            String status = requestData.get("status").getAsString().toLowerCase();

            // Check if status is valid
            if (!VALID_STATUSES.contains(status)) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson("Invalid status. Valid statuses: pending, processing, shipped, delivered, cancelled"));
                return;
            }

            // Update order status
            Optional<Order> updatedOrder = dataManager.updateOrderStatus(orderId, status);

            if (updatedOrder.isPresent()) {
                JsonObject response = new JsonObject();
                response.addProperty("success", true);
                response.addProperty("message", "Order status updated successfully");
                response.add("order", gson.toJsonTree(updatedOrder.get()));
                resp.getWriter().write(gson.toJson(response));
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write(errorJson("Order not found"));
            }

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(errorJson("Failed to update order: " + e.getMessage()));
        }
    }

    /**
     * Check if the current session user is an admin
     */
    private boolean isAdmin(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return false;
        String role = (String) session.getAttribute("userRole");
        return "admin".equals(role);
    }

    private String errorJson(String message) {
        JsonObject error = new JsonObject();
        error.addProperty("error", message);
        return gson.toJson(error);
    }
}