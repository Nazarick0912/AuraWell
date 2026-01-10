package com.aurawell.api;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * Response wrapper that adds SameSite=None; Secure attributes to JSESSIONID cookies.
 * This is required for cross-origin requests (Vercel frontend -> Railway backend)
 * where the browser needs to send session cookies across different domains.
 */
public class SessionCookieResponseWrapper extends HttpServletResponseWrapper {
    
    public SessionCookieResponseWrapper(HttpServletResponse response) {
        super(response);
    }
    
    @Override
    public void addHeader(String name, String value) {
        if ("Set-Cookie".equalsIgnoreCase(name) && value != null) {
            value = addSameSiteAttribute(value);
        }
        super.addHeader(name, value);
    }
    
    @Override
    public void setHeader(String name, String value) {
        if ("Set-Cookie".equalsIgnoreCase(name) && value != null) {
            value = addSameSiteAttribute(value);
        }
        super.setHeader(name, value);
    }
    
    /**
     * Adds SameSite=None and Secure attributes to JSESSIONID cookies.
     * SameSite=None tells the browser to send the cookie on cross-site requests.
     * Secure is required when using SameSite=None.
     */
    private String addSameSiteAttribute(String cookie) {
        // Only modify JSESSIONID cookies, and only if they don't already have SameSite
        if (cookie.contains("JSESSIONID") && !cookie.contains("SameSite")) {
            // Ensure Secure flag is present (required for SameSite=None)
            if (!cookie.contains("Secure")) {
                cookie += "; Secure";
            }
            cookie += "; SameSite=None";
        }
        return cookie;
    }
}
