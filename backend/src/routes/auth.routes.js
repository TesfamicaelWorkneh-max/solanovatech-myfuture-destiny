import express from "express";
export const router = express.Router();
import {
  register,
  login,
  getMe,
  logout,
  updateDetails,
  updatePassword,
} from "../controllers/auth.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", protect, getMe);
router.get("/logout", protect, logout);
router.put("/updatedetails", protect, updateDetails);
router.put("/updatepassword", protect, updatePassword);
