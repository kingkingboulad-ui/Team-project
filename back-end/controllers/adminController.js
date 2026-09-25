import bcrypt from "bcrypt";
import db from "../config/DBConnect.js";

// 1. جلب بيانات الأدمن الحالي
export const getAdminProfile = async (req, res) => {
  try {
    const adminId = req.user?.id || req.user?.userId;

    // استخدام ? لـ MySQL وحذف image لتفادي الخطأ
    const [rows] = await db.query(
      "SELECT id, first_name, last_name, email, phone, role FROM users WHERE id = ?",
      [adminId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    return res.status(200).json({
      success: true,
      user: rows[0],
    });
  } catch (error) {
    console.error("getAdminProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 2. تحديث الملف الشخصي
export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user?.id || req.user?.userId;
    const { first_name, last_name, phone } = req.body;

    if (!first_name) {
      return res.status(400).json({
        success: false,
        message: "First name is required",
      });
    }

    await db.query(
      `UPDATE users 
       SET first_name = ?, last_name = ?, phone = ?, updated_at = NOW() 
       WHERE id = ?`,
      [first_name, last_name || "", phone || null, adminId]
    );

    const [rows] = await db.query(
      "SELECT id, first_name, last_name, email, phone, role FROM users WHERE id = ?",
      [adminId]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const updatedUser = rows[0];

    // تحديث الكوكي العام في المتصفح
    res.cookie("user", JSON.stringify(updatedUser), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("updateAdminProfile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 3. تغيير كلمة المرور
export const changeAdminPassword = async (req, res) => {
  try {
    const adminId = req.user?.id || req.user?.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "All password fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 6 characters",
      });
    }

    const [rows] = await db.query("SELECT password FROM users WHERE id = ?", [adminId]);

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, rows[0].password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await db.query("UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?", [
      hashedPassword,
      adminId,
    ]);

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("changeAdminPassword error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// 4. إنشاء مسؤول جديد (Add Admin)
export const createAdmin = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role = "admin" } = req.body;

    if (!first_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "First name, email, and password are required",
      });
    }

    const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing && existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, role, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW(), NOW())`,
      [first_name, last_name || "", email, hashedPassword, role]
    );

    return res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: result.insertId,
        first_name,
        last_name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("createAdmin error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};