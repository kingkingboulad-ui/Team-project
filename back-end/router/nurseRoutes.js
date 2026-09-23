import express from "express";

import {
    applyAsNurse,
    getMyNurseProfile,
    getAllNurses,
    getNurseById,
    updateNurseStatus,
    getNurses ,
    getNurseBookings, updateBookingStatus,
    getUserProfile,
    deleteNurseBooking,
    getLatestNurses,
    rateNurse,
    deleteNurse,
    updateNurseProfile

} from "../controllers/nurseController.js";

import {
    protect,
    adminOnly
} from "../middleware/authMiddleware.js";



import upload from "../middleware/UploadMiddleware.js"

const router = express.Router();

router.post(
    "/apply",
    protect,
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "cvFile", maxCount: 1 }
    ]),
    applyAsNurse
  );



router.get(
    "/me",
    protect,
    getMyNurseProfile
);

router.get("/latest", getLatestNurses);

router.get(
    "/",
   
    getAllNurses
);


router.put(
    "/:id/status",
   
    updateNurseStatus
);

router.post("/:nurseId/rate", protect, rateNurse);



router.get("/getall", getNurses);



router.get("/my-bookings", protect, getNurseBookings);
router.patch("/bookings/:id/status", protect, updateBookingStatus);



router.delete('/:id', protect, deleteNurse);




router.get("/users/:id", getUserProfile);

router.delete("/bookings/:id", protect, deleteNurseBooking);
router.put(
    "/me/update",
    protect,
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "cvFile", maxCount: 1 }
    ]),
    updateNurseProfile
  );
export default router;



