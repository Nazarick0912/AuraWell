package com.aurawell.models;

import java.util.UUID;

public class User {
    private String id;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private String role; // "user" or "admin"
    private long createdAt;

    public User() {
        this.id = UUID.randomUUID().toString();
        this.createdAt = System.currentTimeMillis();
        this.role = "user";
    }

    public User(String email, String password, String firstName, String lastName) {
        this();
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public long getCreatedAt() { return createdAt; }
    public void setCreatedAt(long createdAt) { this.createdAt = createdAt; }

    /**
     * Creates a shallow copy of this user to prevent mutation of stored data.
     */
    public User copy() {
        User copy = new User();
        copy.id = this.id;
        copy.email = this.email;
        copy.password = this.password;
        copy.firstName = this.firstName;
        copy.lastName = this.lastName;
        copy.role = this.role;
        copy.createdAt = this.createdAt;
        return copy;
    }
}

