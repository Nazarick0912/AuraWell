package com.aurawell.api.admin;

import com.aurawell.models.Product;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

public class AdminProductServlet extends HttpServlet {
    private final DataManager dataManager = DataManager.getInstance();
    private final Gson gson = new Gson();

    // Valid categories and age groups for validation
    private static final Set<String> VALID_CATEGORIES = new HashSet<>(Arrays.asList(
            "vitamins", "supplements", "aromatherapy"
    ));
    private static final Set<String> VALID_AGE_GROUPS = new HashSet<>(Arrays.asList(
            "toddler", "child", "teen", "adult", "elderly", "all"
    ));

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Check admin access
        if (!isAdmin(req)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write(errorJson("Admin access required"));
            return;
        }

        try {
            // Parse request body
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Product productData = gson.fromJson(body, Product.class);

            // Validate required fields
            String validationError = validateProduct(productData);
            if (validationError != null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson(validationError));
                return;
            }

            // Create new product with fresh ID and timestamp
            Product newProduct = new Product(
                    productData.getName(),
                    productData.getDescription(),
                    productData.getPrice(),
                    productData.getStock(),
                    productData.getCategory().toLowerCase(),
                    productData.getAgeGroup().toLowerCase(),
                    productData.getImageUrl()
            );

            // Save product
            dataManager.addProduct(newProduct);

            // Return success response
            JsonObject response = new JsonObject();
            response.addProperty("success", true);
            response.addProperty("message", "Product created successfully");
            response.add("product", gson.toJsonTree(newProduct));

            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write(gson.toJson(response));

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(errorJson("Failed to create product: " + e.getMessage()));
        }
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

        // Get product ID from path
        String productId = extractProductId(req);
        if (productId == null || productId.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write(errorJson("Product ID is required"));
            return;
        }

        try {
            // Parse request body
            String body = req.getReader().lines().collect(Collectors.joining(System.lineSeparator()));
            Product productData = gson.fromJson(body, Product.class);

            // Validate product data
            String validationError = validateProduct(productData);
            if (validationError != null) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson(validationError));
                return;
            }

            // Normalize category and ageGroup
            productData.setCategory(productData.getCategory().toLowerCase());
            productData.setAgeGroup(productData.getAgeGroup().toLowerCase());

            // Update product (DataManager preserves ID and createdAt)
            Optional<Product> updatedProduct = dataManager.updateProduct(productId, productData);

            if (updatedProduct.isPresent()) {
                JsonObject response = new JsonObject();
                response.addProperty("success", true);
                response.addProperty("message", "Product updated successfully");
                response.add("product", gson.toJsonTree(updatedProduct.get()));
                resp.getWriter().write(gson.toJson(response));
            } else {
                resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
                resp.getWriter().write(errorJson("Product not found"));
            }

        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(errorJson("Failed to update product: " + e.getMessage()));
        }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Check admin access
        if (!isAdmin(req)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.getWriter().write(errorJson("Admin access required"));
            return;
        }

        // Get product ID from path
        String productId = extractProductId(req);
        if (productId == null || productId.isEmpty()) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write(errorJson("Product ID is required"));
            return;
        }

        // Delete product
        boolean deleted = dataManager.deleteProduct(productId);

        if (deleted) {
            JsonObject response = new JsonObject();
            response.addProperty("success", true);
            response.addProperty("message", "Product deleted successfully");
            resp.getWriter().write(gson.toJson(response));
        } else {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.getWriter().write(errorJson("Product not found"));
        }
    }

    /**
     * Extract product ID from path info
     * e.g., /api/admin/products/123 → 123
     */
    private String extractProductId(HttpServletRequest req) {
        String pathInfo = req.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            return null;
        }
        // Remove leading slash
        String id = pathInfo.substring(1);
        // Handle trailing slashes or additional segments
        if (id.contains("/")) {
            id = id.split("/")[0];
        }
        return id.isEmpty() ? null : id;
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

    /**
     * Validate product data
     */
    private String validateProduct(Product product) {
        if (product == null) {
            return "Product data is required";
        }
        if (product.getName() == null || product.getName().trim().isEmpty()) {
            return "Product name is required";
        }
        if (product.getPrice() <= 0) {
            return "Price must be greater than 0";
        }
        if (product.getStock() < 0) {
            return "Stock cannot be negative";
        }
        if (product.getCategory() == null || !VALID_CATEGORIES.contains(product.getCategory().toLowerCase())) {
            return "Invalid category. Valid categories: vitamins, supplements, aromatherapy";
        }
        if (product.getAgeGroup() == null || !VALID_AGE_GROUPS.contains(product.getAgeGroup().toLowerCase())) {
            return "Invalid age group. Valid age groups: toddler, child, teen, adult, elderly, all";
        }
        return null; // No errors
    }

    private String errorJson(String message) {
        JsonObject error = new JsonObject();
        error.addProperty("error", message);
        return gson.toJson(error);
    }
}

