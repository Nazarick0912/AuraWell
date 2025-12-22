package com.aurawell.services;

import com.aurawell.models.User;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class UserService {
    private List<User> users = new ArrayList<>();

    public UserService() {
        loadUsers();
    }

    private void loadUsers() {
        try {
            // This reads the file from your 'resources' folder correctly, even inside a JAR/WAR
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("users.json");
            
            if (inputStream == null) {
                System.out.println("⚠️ ERROR: users.json not found!");
                return;
            }

            Reader reader = new InputStreamReader(inputStream);
            Gson gson = new Gson();
            Type userListType = new TypeToken<ArrayList<User>>(){}.getType();
            users = gson.fromJson(reader, userListType);
            
            System.out.println("✅ Users loaded: " + users.size());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public User login(String email, String password) {
        for (User user : users) {
            // Check if email matches & password matches
            if (user.getEmail().equalsIgnoreCase(email) && user.getPassword().equals(password)) {
                return user;
            }
        }
        return null; // No match
    }
}