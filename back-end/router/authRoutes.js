import express from "express";

import {
  register,
  login,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/**
 * Register
 *
 * Supports:
 * - Patient registration
 * - Nurse registration + files
 */
router.post(
  "/register",
  upload.fields([
    {
      name: "license",
      maxCount: 1,
    },
    {
      name: "cv",
      maxCount: 1,
    },
  ]),
  register
);

/**
 * Login
 */
router.post("/login", login);

/**
 * Current logged-in user
 */
router.get("/me", protect, async (req, res) => {
  res.json({
    user: req.user,
  });
});

export default router;