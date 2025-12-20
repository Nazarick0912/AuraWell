package com.aurawell.api;

import com.aurawell.services.DataManager;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class AppContextListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        // Eagerly initialize DataManager on app startup.
        // Storage model:
        // - DATA_DIR environment variable (preferred)
        // - else: System.getProperty("user.dir") + "/data"
        DataManager dm = DataManager.getInstance();

        // Optional visibility for debugging/ops
        sce.getServletContext().setAttribute("DATA_DIR", dm.getDataDir());
        System.out.println("AuraWell API initialized. DATA_DIR: " + dm.getDataDir());
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        System.out.println("AuraWell API shutting down.");
    }
}


