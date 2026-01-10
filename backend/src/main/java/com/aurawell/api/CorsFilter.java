package com.aurawell.api;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter implements Filter {
    
    // Allowed origin patterns for security
    // - localhost for development
    // - Production Vercel URL
    // - All Vercel preview URLs (*.vercel.app)
    private static final String[] ALLOWED_ORIGINS = {
        "http://localhost",
        "https://aura-well-three.vercel.app",
        ".vercel.app"  // Suffix match for all Vercel preview URLs
    };

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        HttpServletRequest httpRequest = (HttpServletRequest) request;

        String origin = httpRequest.getHeader("Origin");
        if (origin != null && isAllowedOrigin(origin)) {
            httpResponse.setHeader("Access-Control-Allow-Origin", origin);
        }

        httpResponse.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        httpResponse.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept, X-Requested-With");
        httpResponse.setHeader("Access-Control-Allow-Credentials", "true"); // Required for session cookies
        httpResponse.setHeader("Access-Control-Max-Age", "3600");

        // Handle preflight OPTIONS request correctly
        if ("OPTIONS".equalsIgnoreCase(httpRequest.getMethod())) {
            httpResponse.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Wrap response to add SameSite=None; Secure to session cookies
        // This is required for cross-origin cookie transmission
        chain.doFilter(request, new SessionCookieResponseWrapper(httpResponse));
    }

    /**
     * Validates if the origin is in our allowed list.
     * Supports exact matches and suffix matches (for subdomains like *.vercel.app)
     */
    private boolean isAllowedOrigin(String origin) {
        if (origin == null) {
            return false;
        }
        
        for (String allowed : ALLOWED_ORIGINS) {
            if (allowed.startsWith(".")) {
                // Suffix match for subdomains (e.g., ".vercel.app" matches "foo.vercel.app")
                if (origin.endsWith(allowed) || origin.contains("://" + allowed.substring(1))) {
                    return true;
                }
            } else if (origin.startsWith(allowed)) {
                // Prefix match (e.g., "http://localhost" matches "http://localhost:3000")
                return true;
            }
        }
        return false;
    }

    @Override public void init(FilterConfig filterConfig) {}
    @Override public void destroy() {}
}