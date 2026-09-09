import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import DBConnection from "./config/DBConnect.js";
import authRoutes from "./router/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});