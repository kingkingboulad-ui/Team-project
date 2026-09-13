import multer from "multer";
import path from "path";
import fs from "fs";

const licenseDir = "uploads/licenses";
const cvDir = "uploads/cvs";

fs.mkdirSync(licenseDir, { recursive: true });
fs.mkdirSync(cvDir, { recursive: true });

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        if (file.fieldname === "licenseFile") {
            cb(null, licenseDir);
        }

        else if (file.fieldname === "cvFile") {
            cb(null, cvDir);
        }

        else {
            cb(new Error("Invalid file field"));
        }
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});

const fileFilter = (req, file, cb) => {

    const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF, JPG, JPEG and PNG files are allowed"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

export default upload;