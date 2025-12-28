package com.aurawell.api.orders;

import com.aurawell.models.Cart;
import com.aurawell.models.Order;
import com.aurawell.models.OrderItem;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@WebServlet(name = "OrdersServlet", urlPatterns = "/api/orders")
public class OrdersServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    //get /api/orders - view user order history
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            //fetch orders for this specific user
            List<Order> userOrders = dataManager.getOrdersByUserId(userId);
            resp.getWriter().write(gson.toJson(userOrders));
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    //post /api/orders - place new order from current cart
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        HttpSession session = req.getSession(false);

        if (session != null && session.getAttribute("userId") != null) {
            String userId = (String) session.getAttribute("userId");
            Cart cart = dataManager.getCartByUserId(userId);

            //check if cart is empty before doing anything
            if (cart.getItems().isEmpty()) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\": \"cart is empty\"}");
                return;
            }

            //read shipping address from the request body
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Order orderRequest = gson.fromJson(body, Order.class);

            //convert cart items to order items with current prices
            List<OrderItem> orderItems = cart.getItems().stream()
                .map(item -> {
                    return dataManager.getProductById(item.getProductId())
                        .map(p -> new OrderItem(item.getProductId(), p.getName(), item.getQuantity(), p.getPrice()))
                        .orElse(null); //safety check in case product is missing
                })
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toList());

            //calculate the total amount
            double total = orderItems.stream().mapToDouble(i -> i.getPriceAtPurchase() * i.getQuantity()).sum();
            Order newOrder = new Order(userId, orderItems, total, orderRequest.getShippingAddress());

            //try to place the order (it deducts stock and saves to json)
            Optional<Order> placedOrder = dataManager.placeOrder(newOrder);

            if (placedOrder.isPresent()) {
                //clear cart and save the state after successful checkout
                cart.clear(); 
                dataManager.saveCarts();
                resp.setStatus(HttpServletResponse.SC_CREATED);
                resp.getWriter().write(gson.toJson(placedOrder.get()));
            } else {
                //usually happens if someone bought the last item while you were checking out
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write("{\"error\": \"insufficient stock for some items\"}");
            }
        } else {
            resp.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }
}