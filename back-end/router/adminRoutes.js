import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js"; // عدل مسار الملف حسب مكانه
import {
  getAdminProfile,
  updateAdminProfile,
  changeAdminPassword,
  createAdmin,
} from "../controllers/adminController.js";

const router = express.Router();

// جميع هذه المسارات محمية وتتطلب تسجيل دخول ورتبة admin
router.use(protect);
router.use(adminOnly);

// مسارات الإعدادات والبروفايل
router.get("/profile", getAdminProfile);
router.put("/update-profile", updateAdminProfile);
router.put("/change-password", changeAdminPassword);

// مسار إضافة أدمن جديد
router.post("/create", createAdmin);

export default router;