package com.aurawell.services;

import com.aurawell.models.Cart;
import com.aurawell.models.Order;
import com.aurawell.models.Product;
import com.aurawell.models.User;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.Writer;
import java.lang.reflect.Type;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;
import java.util.Collections;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class DataManager {
    private static DataManager instance;
    private final Gson gson;
    private List<Product> products;
    private List<User> users;
    private List<Cart> carts;
    private List<Order> orders;
    private Path dataDir;

    private DataManager() {
        this.gson = new GsonBuilder().setPrettyPrinting().create();
        this.products = new ArrayList<>();
        this.users = new ArrayList<>();
        this.carts = new ArrayList<>();
        this.orders = new ArrayList<>();

        initializeStorageAndLoad();
    }

    public static synchronized DataManager getInstance() {
        if (instance == null) {
            instance = new DataManager();
        }
        return instance;
    }

    public synchronized String getDataDir() {
        return dataDir.toString();
    }

    private static Path resolveDataDir() {
        String envDataDir = System.getenv("DATA_DIR");
        if (envDataDir != null && !envDataDir.trim().isEmpty()) {
            return Paths.get(envDataDir.trim()).toAbsolutePath().normalize();
        }

        String userDir = System.getProperty("user.dir");
        return Paths.get(userDir, "data").toAbsolutePath().normalize();
    }

    private synchronized void initializeStorageAndLoad() {
        this.dataDir = resolveDataDir();
        System.out.println("[DataManager] Using data directory: " + dataDir);

        try {
            Files.createDirectories(dataDir);
        } catch (IOException e) {
            System.err.println("[DataManager] Failed to create data directory: " + e.getMessage());
        }

        ensureJsonFileInitialized("products.json", "data/products.json");
        ensureJsonFileInitialized("users.json", "data/users.json");
        ensureJsonFileInitialized("carts.json", "data/carts.json");
        ensureJsonFileInitialized("orders.json", "data/orders.json");

        loadAll();
    }

    private Path filePath(String filename) {
        return dataDir.resolve(filename);
    }

    private void ensureJsonFileInitialized(String filename, String classpathResource) {
        Path target = filePath(filename);
        if (Files.exists(target)) {
            return;
        }

        // Prefer seeding from classpath if present, else write empty JSON array.
        boolean seeded = false;
        if (classpathResource != null && !classpathResource.isBlank()) {
            try (InputStream is = getClass().getClassLoader().getResourceAsStream(classpathResource)) {
                if (is != null) {
                    Files.copy(is, target);
                    System.out.println("[DataManager] Seeded " + filename + " from classpath: " + classpathResource);
                    seeded = true;
                }
            } catch (IOException e) {
                System.err.println("[DataManager] Failed seeding " + filename + " from classpath: " + e.getMessage());
            }
        }

        if (!seeded) {
            try {
                Files.writeString(target, "[]");
                System.out.println("[DataManager] Created empty " + filename + " (no classpath seed found)");
            } catch (IOException e) {
                System.err.println("[DataManager] Failed creating empty " + filename + ": " + e.getMessage());
            }
        }
    }

    private void loadAll() {
        this.products = loadListFromFile("products.json", new TypeToken<List<Product>>() {}.getType());
        this.users = loadListFromFile("users.json", new TypeToken<List<User>>() {}.getType());
        this.carts = loadListFromFile("carts.json", new TypeToken<List<Cart>>() {}.getType());
        this.orders = loadListFromFile("orders.json", new TypeToken<List<Order>>() {}.getType());

        System.out.println("[DataManager] Loaded products=" + products.size()
                + ", users=" + users.size()
                + ", carts=" + carts.size()
                + ", orders=" + orders.size());
    }

    private <T> List<T> loadListFromFile(String filename, Type listType) {
        Path path = filePath(filename);
        if (!Files.exists(path)) {
            return new ArrayList<>();
        }

        try (Reader reader = new FileReader(path.toFile())) {
            List<T> list = gson.fromJson(reader, listType);
            if (list == null) {
                return new ArrayList<>();
            }
            return new ArrayList<>(list);
        } catch (IOException e) {
            System.err.println("[DataManager] Error loading " + filename + ": " + e.getMessage());
            return new ArrayList<>();
        }
    }

    private synchronized void saveListToFile(String filename, Object value) {
        try {
            Files.createDirectories(dataDir);
        } catch (IOException e) {
            System.err.println("[DataManager] Cannot save " + filename + " - failed to ensure data directory: " + e.getMessage());
            return;
        }

        try (Writer writer = new FileWriter(filePath(filename).toFile())) {
            gson.toJson(value, writer);
        } catch (IOException e) {
            System.err.println("[DataManager] Error saving " + filename + ": " + e.getMessage());
        }
    }

    public synchronized List<Product> getAllProducts() {
        return new ArrayList<>(products);
    }

    public synchronized List<Product> getProductsByCategory(String category) {
        return products.stream()
                .filter(p -> p.getCategory() != null && p.getCategory().equalsIgnoreCase(category))
                .toList();
    }

    public synchronized Optional<Product> getProductById(String id) {
        return products.stream()
                .filter(p -> p.getId().equals(id))
                .findFirst();
    }

    public synchronized void saveProducts() {
        saveListToFile("products.json", products);
        System.out.println("[DataManager] Saved " + products.size() + " products to: " + filePath("products.json"));
    }

    public synchronized Product addProduct(Product product) {
        products.add(product);
        saveProducts();
        return product;
    }

    public synchronized Optional<Product> updateProduct(String id, Product updatedProduct) {
        for (int i = 0; i < products.size(); i++) {
            if (products.get(i).getId().equals(id)) {
                // Preserve original createdAt
                updatedProduct.setId(id);
                updatedProduct.setCreatedAt(products.get(i).getCreatedAt());
                products.set(i, updatedProduct);
                saveProducts();
                return Optional.of(updatedProduct);
            }
        }
        return Optional.empty();
    }

    public synchronized boolean deleteProduct(String id) {
        boolean removed = products.removeIf(p -> p.getId().equals(id));
        if (removed) {
            saveProducts();
        }
        return removed;
    }

    // Check user email and password for login
    public synchronized User login(String email, String password) {
    for (User user : users) {
        if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equals(password)) {
            return user;
        }
    }
    return null; 
}
}

