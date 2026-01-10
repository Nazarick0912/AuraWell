package com.aurawell.api.catalog;

import com.aurawell.models.Product;
import com.aurawell.services.DataManager;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * Handles product catalog endpoints:
 * - GET /api/products       → list all products (optional ?category= filter)
 * - GET /api/products/{id}  → get single product by ID
 */
public class ProductsServlet extends HttpServlet {
    private static final Gson gson = new Gson();
    
    // Allowlist of valid categories
    private static final Set<String> VALID_CATEGORIES = new HashSet<>(Arrays.asList(
        "Vitamins", "Supplements", "Aromatherapy"
    ));

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
            throws ServletException, IOException {
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();

        String pathInfo = req.getPathInfo();

        // If path has an ID segment, fetch single product
        if (pathInfo != null && !pathInfo.equals("/")) {
            handleGetById(pathInfo, resp, out);
        } else {
            handleGetAll(req, resp, out);
        }
    }

    /**
     * GET /api/products - List all products, optionally filtered by category
     */
    private void handleGetAll(HttpServletRequest req, HttpServletResponse resp, PrintWriter out) {
        String category = req.getParameter("category");
        List<Product> products;

        if (category != null && !category.trim().isEmpty()) {
            String trimmedCategory = category.trim();
            
            // Validate category against allowlist
            if (!VALID_CATEGORIES.contains(trimmedCategory)) {
                System.out.println("[ProductsServlet] Invalid category requested: " + category);
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                out.print(gson.toJson(new ErrorResponse("Invalid category. Valid categories: Vitamins, Supplements, Aromatherapy")));
                return;
            }
            
            products = DataManager.getInstance().getProductsByCategory(trimmedCategory);
            System.out.println("[ProductsServlet] GET /api/products?category=" + trimmedCategory + " → " + products.size() + " products");
        } else {
            products = DataManager.getInstance().getAllProducts();
            System.out.println("[ProductsServlet] GET /api/products → " + products.size() + " products");
        }

        out.print(gson.toJson(products));
    }

    /**
     * GET /api/products/{id} - Get single product by ID
     */
    private void handleGetById(String pathInfo, HttpServletResponse resp, PrintWriter out) {
        // Remove leading slash to get the ID
        String productId = pathInfo.substring(1);
        
        // Handle trailing slash or empty ID
        if (productId.isEmpty() || productId.equals("/")) {
            System.out.println("[ProductsServlet] GET /api/products/{id} → Missing product ID");
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            out.print(gson.toJson(new ErrorResponse("Product ID required")));
            return;
        }

        // Remove any additional path segments (e.g., /api/products/123/extra → 123)
        if (productId.contains("/")) {
            productId = productId.split("/")[0];
        }

        Optional<Product> product = DataManager.getInstance().getProductById(productId);

        if (product.isPresent()) {
            System.out.println("[ProductsServlet] GET /api/products/" + productId + " → Found: " + product.get().getName());
            out.print(gson.toJson(product.get()));
        } else {
            System.out.println("[ProductsServlet] GET /api/products/" + productId + " → Not found");
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            out.print(gson.toJson(new ErrorResponse("Product not found")));
        }
    }

    // Simple error response class
    private static class ErrorResponse {
        private final String error;

        public ErrorResponse(String error) {
            this.error = error;
        }
    }
}
