package com.aurawell.api.media;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * Image Servlet - serves uploaded images
 * GET /api/images/{filename} → Serve image file
 */
public class ImageServlet extends HttpServlet {

    // MIME type mapping
    private static final Map<String, String> MIME_TYPES = new HashMap<>();
    static {
        MIME_TYPES.put("jpg", "image/jpeg");
        MIME_TYPES.put("jpeg", "image/jpeg");
        MIME_TYPES.put("png", "image/png");
        MIME_TYPES.put("webp", "image/webp");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String pathInfo = req.getPathInfo();

        // Validate path
        if (pathInfo == null || pathInfo.equals("/") || pathInfo.length() < 2) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"error\": \"Image filename required\"}");
            return;
        }

        // Extract filename (remove leading slash)
        String filename = pathInfo.substring(1);

        // Security: Prevent path traversal attacks
        if (filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"error\": \"Invalid filename\"}");
            return;
        }

        // Get file extension and validate
        String extension = getFileExtension(filename);
        if (extension == null || !MIME_TYPES.containsKey(extension.toLowerCase())) {
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"error\": \"Invalid file type\"}");
            return;
        }

        // Resolve file path
        Path uploadsDir = getUploadsDirectory();
        Path filePath = uploadsDir.resolve(filename).normalize();

        // Security: Ensure resolved path is still within uploads directory
        if (!filePath.startsWith(uploadsDir)) {
            resp.setStatus(HttpServletResponse.SC_FORBIDDEN);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"error\": \"Access denied\"}");
            return;
        }

        // Check if file exists
        if (!Files.exists(filePath) || !Files.isRegularFile(filePath)) {
            resp.setStatus(HttpServletResponse.SC_NOT_FOUND);
            resp.setContentType("application/json");
            resp.getWriter().write("{\"error\": \"Image not found\"}");
            return;
        }

        // Set content type
        String mimeType = MIME_TYPES.get(extension.toLowerCase());
        resp.setContentType(mimeType);

        // Set caching headers (cache for 1 day)
        resp.setHeader("Cache-Control", "public, max-age=86400");

        // Set content length
        resp.setContentLengthLong(Files.size(filePath));

        // Stream file to response
        try (OutputStream out = resp.getOutputStream()) {
            Files.copy(filePath, out);
        }
    }

    /**
     * Get the uploads directory path
     */
    private Path getUploadsDirectory() {
        String dataDir = System.getenv("DATA_DIR");
        if (dataDir != null && !dataDir.trim().isEmpty()) {
            return Paths.get(dataDir.trim(), "uploads").toAbsolutePath().normalize();
        }
        return Paths.get(System.getProperty("user.dir"), "uploads").toAbsolutePath().normalize();
    }

    /**
     * Get file extension from filename
     */
    private String getFileExtension(String fileName) {
        if (fileName == null || !fileName.contains(".")) {
            return null;
        }
        return fileName.substring(fileName.lastIndexOf('.') + 1);
    }
}

