import express from "express";

import {
    applyAsNurse,
    getMyNurseProfile,
    getAllNurses,
    getNurseById,
    updateNurseStatus,
    getNurses 
} from "../controllers/nurseController.js";

import {
    protect,
    adminOnly
} from "../middleware/authMiddleware.js";

import upload from "../middleware/UploadMiddleware.js";

const router = express.Router();

router.post(
    "/apply",
    protect,

    upload.fields([
        {
            name: "licenseFile",
            maxCount: 1
        },
        {
            name: "cvFile",
            maxCount: 1
        }
    ]),

    applyAsNurse
);




router.get(
    "/me",
    protect,
    getMyNurseProfile
);



router.get(
    "/",
    protect,
    adminOnly,
    getAllNurses
);


router.put(
    "/:id/status",
    protect,
    adminOnly,
    updateNurseStatus
);





router.get("/getall", getNurses);





export default router;



