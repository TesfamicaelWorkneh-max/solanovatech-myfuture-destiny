// import express from "express";
// export const router = express.Router();
// import {
//   getProperties,
//   getProperty,
//   createProperty,
//   updateProperty,
//   deleteProperty,
//   publishProperty,
//   getMyProperties,
//   addToFavorites,
//   removeFromFavorites,
//   archiveProperty,
//   revertToDraft,
//   getFavorites,
//   searchProperties,
// } from "../controllers/property.controller.js";
// import { protect, authorize } from "../middlewares/auth.middleware.js";
// import { checkOwnership } from "../middlewares/role.middleware.js";
// import { uploadMultiple } from "../middlewares/upload.middleware.js";
// import Property from "../models/Property.js";

// // Public routes
// router.get("/", getProperties);
// router.get("/search", searchProperties);
// router.get("/:id", getProperty);

// // Protected routes
// router.use(protect);

// // User routes
// router.post("/:id/favorite", authorize("user"), addToFavorites);
// router.delete("/:id/favorite", authorize("user"), removeFromFavorites);
// router.get("/favorites/all", authorize("user"), getFavorites);
// // router.put("/:id/publish", publishProperty);
// router.put("/:id/archive", archiveProperty);
// router.put("/:id/draft", revertToDraft);
// // Owner routes
// router.post(
//   "/",
//   authorize("owner"),
//   uploadMultiple("images", 10),
//   createProperty,
// );

// router.get("/my/properties", authorize("owner"), getMyProperties);

// router.put(
//   "/:id",
//   authorize("owner"),
//   checkOwnership(Property),
//   uploadMultiple("images", 10),
//   updateProperty,
// );

// router.delete(
//   "/:id",
//   authorize("owner"),
//   checkOwnership(Property),
//   deleteProperty,
// );

// router.put(
//   "/:id/publish",
//   authorize("owner"),
//   checkOwnership(Property),
//   publishProperty,
// );
import express from "express";
import {
  getProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  publishProperty,
  archiveProperty,
  revertToDraft,
  getMyProperties,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
  searchProperties,
  getPropertyStats,
} from "../controllers/property.controller.js";
import { protect, authorize } from "../middlewares/auth.middleware.js";
import uploadMultiple from "../middlewares/upload.middleware.js";

export const router = express.Router();

// Public routes
router.get("/", getProperties);
router.get("/search", searchProperties);
router.get("/:id", getProperty);

// Protected routes
router.use(protect);

// Owner routes
router.get("/my/properties", authorize("owner", "admin"), getMyProperties);

router.post(
  "/",
  authorize("owner"),
  uploadMultiple("images", 10),
  createProperty,
);

router.put(
  "/:id",
  authorize("owner", "admin"),
  uploadMultiple("images", 10),
  updateProperty,
);

router.delete("/:id", authorize("owner", "admin"), deleteProperty);

// Status routes
router.put("/:id/publish", authorize("owner"), publishProperty);
router.put("/:id/archive", authorize("owner", "admin"), archiveProperty);
router.put("/:id/draft", authorize("owner", "admin"), revertToDraft);

// Favorites routes
router.post(
  "/:id/favorite",
  authorize("user", "owner", "admin"),
  addToFavorites,
);
router.delete(
  "/:id/favorite",
  authorize("user", "owner", "admin"),
  removeFromFavorites,
);
router.get("/favorites/my", authorize("user", "owner", "admin"), getFavorites);

// Stats route
router.get("/stats/dashboard", authorize("owner", "admin"), getPropertyStats);
