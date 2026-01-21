import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// We'll configure Cloudinary lazily when the middleware is first used
let cloudinaryConfigured = false;
let cloudinaryInstance = null;

const configureCloudinary = () => {
  if (cloudinaryConfigured) return cloudinaryInstance;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log("Configuring Cloudinary with:");
  console.log("- Cloud Name:", cloudName);
  console.log(
    "- API Key:",
    apiKey ? `${apiKey.substring(0, 8)}...` : "Missing",
  );
  console.log(
    "- API Secret:",
    apiSecret ? `${apiSecret.substring(0, 8)}...` : "Missing",
  );

  if (!cloudName || !apiKey || !apiSecret) {
    console.error("⚠️ Cloudinary not configured. Images will not be saved.");
    console.error(
      "Add to .env: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET",
    );
    cloudinaryConfigured = true;
    return null;
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  cloudinaryInstance = cloudinary;
  cloudinaryConfigured = true;

  // Test connection
  cloudinary.api
    .ping()
    .then(() => console.log("✅ Cloudinary connected"))
    .catch(() => console.error("❌ Cloudinary connection failed"));

  return cloudinaryInstance;
};

// File filter
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error(`Only image files are allowed. Received: ${file.mimetype}`));
  }
};

// Middleware to handle multiple image uploads
const uploadMultiple = (fieldName, maxCount = 10) => {
  return (req, res, next) => {
    console.log(`Upload middleware called for ${fieldName}`);

    // Configure Cloudinary if not already done
    const cloudinary = configureCloudinary();

    let storage;
    if (cloudinary) {
      // Use Cloudinary storage
      storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
          folder: "property_listings",
          allowed_formats: ["jpg", "jpeg", "png", "gif", "webp"],
          transformation: [{ width: 1000, height: 750, crop: "limit" }],
        },
      });
    } else {
      // Fallback to memory storage
      console.log("⚠️ Using memory storage (files won't be saved permanently)");
      storage = multer.memoryStorage();
    }

    const upload = multer({
      storage: storage,
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
      },
      fileFilter: fileFilter,
    });

    upload.array(fieldName, maxCount)(req, res, (err) => {
      if (err) {
        console.error("Upload Error:", err.message);

        let errorMessage = err.message;
        if (err.code === "LIMIT_FILE_SIZE") {
          errorMessage = "File size too large. Maximum size is 10MB.";
        } else if (err.code === "LIMIT_UNEXPECTED_FILE") {
          errorMessage = `Too many files uploaded. Maximum is ${maxCount} images.`;
        }

        return res.status(400).json({
          success: false,
          message: errorMessage,
        });
      }

      // Handle files based on storage type
      if (req.files && req.files.length > 0) {
        console.log(`Upload successful: ${req.files.length} files`);

        // Convert memory buffer to base64 if using memory storage
        if (cloudinary) {
          // Cloudinary: files already have path and filename
          req.files.forEach((file, i) => {
            console.log(`File ${i}: ${file.originalname} → ${file.path}`);
          });
        } else {
          // Memory storage: convert buffers to base64
          req.files.forEach((file, i) => {
            if (file.buffer) {
              const base64 = file.buffer.toString("base64");
              const dataUrl = `data:${file.mimetype};base64,${base64}`;
              // Replace the file object with one that has path and filename
              req.files[i] = {
                ...file,
                path: dataUrl,
                filename: `memory_${Date.now()}_${i}`,
              };
            }
          });
        }
      }

      next();
    });
  };
};

export default uploadMultiple;
