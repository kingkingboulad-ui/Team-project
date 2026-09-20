import express from "express";
import {
  getAllPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientProfileAndRequests // تأكد من استيرادها هنا
} from "../controllers/patientController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/me", protect, getPatientProfileAndRequests);

router.route("/")
  .get(getAllPatients)
  .post(createPatient);

router.route("/:id")
  .get(getPatientById)
  .put(updatePatient)
  .delete(deletePatient);

export default router;