import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
//Import routes
import authRoutes from "./routes/auth.routes";
import propertyRoutes from "./routes/property.routes";
import adminRoutes from "./routes/admin.routes";
//import middlewares
import errorMiddleware from "./middlewares/error.middleware";
dotenv.config();
const app = express();

//middlwares
app.use(helmet());
app.cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Api routes
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
// Error handling middleware
app.use(errorMiddleware);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = app;
