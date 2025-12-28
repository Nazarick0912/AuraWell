/**
 * Cloudinary Image Upload Service
 * Handles image uploads directly from frontend to Cloudinary
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

/**
 * Validates that Cloudinary is properly configured
 * @returns {boolean} True if configured, false otherwise
 */
export function isCloudinaryConfigured() {
    return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
}

/**
 * Validates file before upload
 * @param {File} file - The file to validate
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateImageFile(file) {
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const MAX_SIZE_MB = 10;
    const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

    if (!file) {
        return { valid: false, error: 'No file provided' };
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Allowed: JPG, PNG, WebP' };
    }

    if (file.size > MAX_SIZE_BYTES) {
        return { valid: false, error: `File too large. Maximum size: ${MAX_SIZE_MB}MB` };
    }

    return { valid: true };
}

/**
 * Creates a local preview URL for an image file
 * @param {File} file - The image file
 * @returns {string} Local blob URL for preview
 */
export function createLocalPreview(file) {
    return URL.createObjectURL(file);
}

/**
 * Revokes a local preview URL to free memory
 * @param {string} previewUrl - The blob URL to revoke
 */
export function revokeLocalPreview(previewUrl) {
    if (previewUrl && previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl);
    }
}

/**
 * Uploads an image to Cloudinary
 * @param {File} file - The image file to upload
 * @param {object} options - Upload options
 * @param {function} options.onProgress - Progress callback (0-100)
 * @returns {Promise<{ success: boolean, url?: string, error?: string }>}
 */
export async function uploadImage(file, options = {}) {
    const { onProgress } = options;

    // Check configuration
    if (!isCloudinaryConfigured()) {
        return { 
            success: false, 
            error: 'Cloudinary is not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.' 
        };
    }

    // Validate file
    const validation = validateImageFile(file);
    if (!validation.valid) {
        return { success: false, error: validation.error };
    }

    // Prepare form data for Cloudinary
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', 'aurawell/products'); // Organize uploads in a folder

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
        // Use XMLHttpRequest for progress tracking
        if (onProgress) {
            return await uploadWithProgress(uploadUrl, formData, onProgress);
        }

        // Simple fetch upload without progress
        const response = await fetch(uploadUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { 
                success: false, 
                error: errorData.error?.message || 'Upload failed' 
            };
        }

        const data = await response.json();
        return { 
            success: true, 
            url: data.secure_url,
            publicId: data.public_id 
        };

    } catch (error) {
        console.error('Cloudinary upload error:', error);
        return { 
            success: false, 
            error: 'Network error. Please check your connection and try again.' 
        };
    }
}

/**
 * Upload with progress tracking using XMLHttpRequest
 * @private
 */
function uploadWithProgress(url, formData, onProgress) {
    return new Promise((resolve) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percent = Math.round((event.loaded / event.total) * 100);
                onProgress(percent);
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    resolve({ 
                        success: true, 
                        url: data.secure_url,
                        publicId: data.public_id 
                    });
                } catch {
                    resolve({ success: false, error: 'Invalid response from server' });
                }
            } else {
                try {
                    const errorData = JSON.parse(xhr.responseText);
                    resolve({ 
                        success: false, 
                        error: errorData.error?.message || 'Upload failed' 
                    });
                } catch {
                    resolve({ success: false, error: 'Upload failed' });
                }
            }
        });

        xhr.addEventListener('error', () => {
            resolve({ success: false, error: 'Network error during upload' });
        });

        xhr.addEventListener('abort', () => {
            resolve({ success: false, error: 'Upload cancelled' });
        });

        xhr.open('POST', url);
        xhr.send(formData);
    });
}

export default {
    isCloudinaryConfigured,
    validateImageFile,
    createLocalPreview,
    revokeLocalPreview,
    uploadImage,
};
