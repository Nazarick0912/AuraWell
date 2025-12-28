package com.aurawell.models;

import java.util.ArrayList;
import java.util.List;

public class Cart {
    private String userId;
    private List<CartItem> items;

    public Cart() {
        this.items = new ArrayList<>();
    }

    public Cart(String userId) {
        this();
        this.userId = userId;
    }

    // Getters and Setters
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public List<CartItem> getItems() { return items; }
    public void setItems(List<CartItem> items) { this.items = items; }

    // Helper methods
    public void addItem(String productId, int quantity) {
        for (CartItem item : items) {
            if (item.getProductId().equals(productId)) {
                int newQuantity = item.getQuantity() + quantity;
                if (newQuantity <= 0) {
                    // Auto-remove item when quantity becomes 0 or negative
                    items.remove(item);
                } else {
                    item.setQuantity(newQuantity);
                }
                return;
            }
        }
        // Only add new item if quantity is positive
        if (quantity > 0) {
            items.add(new CartItem(productId, quantity));
        }
    }

    public void updateItem(String productId, int quantity) {
        for (CartItem item : items) {
            if (item.getProductId().equals(productId)) {
                if (quantity <= 0) {
                    items.remove(item);
                } else {
                    item.setQuantity(quantity);
                }
                return;
            }
        }
    }

    public void removeItem(String productId) {
        items.removeIf(item -> item.getProductId().equals(productId));
    }

    public void clear() {
        items.clear();
    }
}

