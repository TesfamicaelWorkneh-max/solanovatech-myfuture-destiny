// import express from "express";
// export const router = express.Router();
// import {
//   getSystemMetrics,
//   getAllUsers,
//   getAllProperties,
//   disableProperty,
//   disableUser,
//   enableUser,
//   updateUserRole,
// } from "../controllers/admin.controller.js";
// import { protect, authorize } from "../middlewares/auth.middleware.js";

// // All admin routes require admin role
// router.use(protect);
// router.use(authorize("admin"));

// // System metrics
// router.get("/metrics", getSystemMetrics);

// // User management
// router.get("/users", getAllUsers);
// router.put("/users/:id/disable", disableUser);
// router.put("/users/:id/enable", enableUser);
// router.put("/users/:id/role", updateUserRole);

// // Property management
// router.get("/properties", getAllProperties);
// router.put("/properties/:id/disable", disableProperty);
import express from "express";
import {
  getAdminProperties,
  getAdminUsers,
  toggleUserStatus,
  adminArchiveProperty,
  getSystemMetrics,
} from "../controllers/admin.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";

export const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize("admin"));

// Property management
router.get("/properties", getAdminProperties);
router.put("/properties/:id/archive", adminArchiveProperty);

// User management
router.get("/users", getAdminUsers);
router.put("/users/:id/toggle-status", toggleUserStatus);

// System metrics
router.get("/metrics", getSystemMetrics);
