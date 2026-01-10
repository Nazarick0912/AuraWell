package com.aurawell.api;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * Utility class to handle session cookies for cross-origin requests.
 * Manually sets the JSESSIONID cookie with SameSite=None; Secure attributes.
 */
public class SessionCookieHelper {
    
    /**
     * Sets the session cookie with proper cross-origin attributes.
     * Call this after creating a new session to ensure the cookie is sent correctly.
     * 
     * @param session The HTTP session
     * @param response The HTTP response
     */
    public static void setSessionCookie(HttpSession session, HttpServletResponse response) {
        if (session == null || response == null) {
            return;
        }
        
        String sessionId = session.getId();
        
        // Build the Set-Cookie header manually with all required attributes
        // SameSite=None requires Secure flag
        String cookieValue = String.format(
            "JSESSIONID=%s; Path=/; HttpOnly; Secure; SameSite=None",
            sessionId
        );
        
        // Use addHeader to add the cookie (setHeader would replace existing cookies)
        response.addHeader("Set-Cookie", cookieValue);
    }
}
