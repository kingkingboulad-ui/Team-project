import express from "express";
import { createCareRequest } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
// إن أردت قراءة المستخدم المسجل استعمل authMiddleware لكن دون منعه إن كان زائراً
const router = express.Router();

router.post("/care-requests", protect,createCareRequest);

export default router;