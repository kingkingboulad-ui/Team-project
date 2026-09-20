import multer from "multer";
import path from "path";
import fs from "fs";

// Upload directories
const licenseDir = "uploads/licenses";
const cvDir = "uploads/cvs";

// Create folders if they don't exist
fs.mkdirSync(licenseDir, { recursive: true });
fs.mkdirSync(cvDir, { recursive: true });

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // قبول license أو licenseFile
    if (file.fieldname === "license" || file.fieldname === "licenseFile") {
      cb(null, licenseDir);
    // قبول cv أو cvFile
    } else if (file.fieldname === "cv" || file.fieldname === "cvFile") {
      cb(null, cvDir);
    } else {
      cb(new Error(`Invalid file field: ${file.fieldname}`), false);
    }
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

// Allowed file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only PDF, JPG, JPEG and PNG files are allowed"
      ),
      false
    );
  }
};

// Multer configuration
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;