import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import DBConnection from "./config/DBConnect.js";
import authRoutes from "./router/authRoutes.js";
import nurseRoutes from "./router/nurseRoutes.js";
import patientRoutes from "./router/patientRoutes.js";
import dashboardRoutes from "./router/dashboardRoutes.js";
import bookingRoutes from "./router/bookingRoutes.js";
// import upload from '../middleware/uploadMiddleware.js';
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/uploads",express.static("uploads"));

app.use("/api/nurses", nurseRoutes);

app.use("/api/patients", patientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});