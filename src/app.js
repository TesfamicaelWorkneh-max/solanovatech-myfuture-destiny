import express from "express";
import cors from "cors";
import helmet from "helmet";
// import dotenv from "dotenv";

// // Load .env file FIRST
// dotenv.config();

// Import routes
import { router as authRoutes } from "./routes/auth.routes.js";
import { router as propertyRoutes } from "./routes/property.routes.js";
import { router as adminRoutes } from "./routes/admin.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use(errorHandler);
// Simple test endpoint
app.get("/api/test-env", (req, res) => {
  res.json({
    cloudinary: {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME ? "SET" : "NOT SET",
      apiKey: process.env.CLOUDINARY_API_KEY ? "SET" : "NOT SET",
      apiSecret: process.env.CLOUDINARY_API_SECRET ? "SET" : "NOT SET",
    },
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT,
  });
});
// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

export default app;
