package com.aurawell.api.media;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * Image Upload Servlet - handles image uploads (admin only)
 * POST /api/upload/image → Upload image file
 */
@MultipartConfig(
    fileSizeThreshold = 1024 * 1024,      // 1 MB
    maxFileSize = 10 * 1024 * 1024,       // 10 MB
    maxRequestSize = 15 * 1024 * 1024     // 15 MB
)
public class ImageUploadServlet extends HttpServlet {
    private final Gson gson = new Gson();

    // Allowed MIME types
    private static final Set<String> ALLOWED_MIME_TYPES = new HashSet<>(Arrays.asList(
            "image/jpeg", "image/jpg", "image/png", "image/webp"
    ));

    // Allowed file extensions
    private static final Set<String> ALLOWED_EXTENSIONS = new HashSet<>(Arrays.asList(
            "jpg", "jpeg", "png", "webp"
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
            // Get the uploaded file part
            Part filePart = req.getPart("image");
            if (filePart == null || filePart.getSize() == 0) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson("No image file provided"));
                return;
            }

            // Validate MIME type
            String contentType = filePart.getContentType();
            if (contentType == null || !ALLOWED_MIME_TYPES.contains(contentType.toLowerCase())) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson("Invalid file type. Allowed: JPEG, PNG, WebP"));
                return;
            }

            // Get and validate file extension
            String originalFileName = getFileName(filePart);
            String extension = getFileExtension(originalFileName);
            if (extension == null || !ALLOWED_EXTENSIONS.contains(extension.toLowerCase())) {
                resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                resp.getWriter().write(errorJson("Invalid file extension. Allowed: jpg, jpeg, png, webp"));
                return;
            }

            // Generate unique filename to prevent path traversal and collisions
            String uniqueFileName = UUID.randomUUID().toString() + "." + extension.toLowerCase();

            // Get uploads directory
            Path uploadsDir = getUploadsDirectory();
            Files.createDirectories(uploadsDir);

            // Save file
            Path targetPath = uploadsDir.resolve(uniqueFileName);
            try (InputStream input = filePart.getInputStream()) {
                Files.copy(input, targetPath, StandardCopyOption.REPLACE_EXISTING);
            }

            // Return success with image URL
            String imageUrl = "/api/images/" + uniqueFileName;

            JsonObject response = new JsonObject();
            response.addProperty("success", true);
            response.addProperty("imageUrl", imageUrl);
            response.addProperty("message", "Image uploaded successfully");

            resp.setStatus(HttpServletResponse.SC_CREATED);
            resp.getWriter().write(gson.toJson(response));

        } catch (IllegalStateException e) {
            // File size exceeded
            resp.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            resp.getWriter().write(errorJson("File size exceeds limit (max 10MB)"));
        } catch (Exception e) {
            resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            resp.getWriter().write(errorJson("Failed to upload image: " + e.getMessage()));
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
     * Extract filename from Part header
     */
    private String getFileName(Part part) {
        String contentDisposition = part.getHeader("content-disposition");
        if (contentDisposition != null) {
            for (String token : contentDisposition.split(";")) {
                if (token.trim().startsWith("filename")) {
                    String fileName = token.substring(token.indexOf('=') + 1).trim().replace("\"", "");
                    // Handle path in filename (some browsers send full path)
                    int lastSlash = Math.max(fileName.lastIndexOf('/'), fileName.lastIndexOf('\\'));
                    if (lastSlash >= 0) {
                        fileName = fileName.substring(lastSlash + 1);
                    }
                    return fileName;
                }
            }
        }
        return "unknown";
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

    /**
     * Check if the current session user is an admin
     */
    private boolean isAdmin(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        if (session == null) return false;
        String role = (String) session.getAttribute("userRole");
        return "admin".equals(role);
    }

    private String errorJson(String message) {
        JsonObject error = new JsonObject();
        error.addProperty("error", message);
        return gson.toJson(error);
    }
}

