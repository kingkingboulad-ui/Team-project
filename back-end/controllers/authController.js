import pool from "../config/DBConnect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

import dotenv from "dotenv";
dotenv.config();

/**
 * =========================
 * LOGIN
 * =========================
 */
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // 1. Check required fields
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    // 2. Validate role
    if (!["patient", "nurse"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    // 3. Find user
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = users[0];

    // 4. Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // 5. Check role
    if (user.role !== role) {
      return res.status(403).json({
        message: `This account is registered as ${user.role}, not ${role}`,
      });
    }

    // 6. Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // 7. Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 8. Response
    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


/**
 * =========================
 * REGISTER
 * =========================
 *
 * Supports:
 *
 * PATIENT:
 * users table only
 *
 * NURSE:
 * users table
 * +
 * nurse_profiles table
 * +
 * license file
 * +
 * CV file
 */
export const register = async (req, res) => {
  let connection;

  try {
    /**
     * =========================
     * BASIC USER DATA
     * =========================
     */

    const {
      first_name,
      last_name,
      fullName,
      email,
      password,
      phone,
      role,

      /**
       * Nurse fields
       */
      specialization,
      yearsExperience,
      location,
    } = req.body;

    /**
     * =========================
     * SUPPORT BOTH:
     *
     * Patient:
     * first_name + last_name
     *
     * Nurse:
     * fullName
     * =========================
     */

    let finalFirstName = first_name;
    let finalLastName = last_name;

    // Nurse page sends fullName
    if (role === "nurse" && fullName) {
      const nameParts = fullName.trim().split(/\s+/);

      finalFirstName = nameParts[0];

      finalLastName =
        nameParts.length > 1
          ? nameParts.slice(1).join(" ")
          : "";
    }

    /**
     * =========================
     * VALIDATION
     * =========================
     */

    if (
      !finalFirstName ||
      !finalLastName ||
      !email ||
      !password ||
      !role
    ) {
      return res.status(400).json({
        message:
          "First name, last name, email, password and role are required",
      });
    }

    /**
     * =========================
     * VALIDATE ROLE
     * =========================
     */

    if (!["patient", "nurse"].includes(role)) {
      return res.status(400).json({
        message: "Invalid role",
      });
    }

    /**
     * =========================
     * NURSE VALIDATION
     * =========================
     */

    if (role === "nurse") {
      if (
        !specialization ||
        !yearsExperience ||
        !location
      ) {
        return res.status(400).json({
          message:
            "Specialization, years of experience and location are required",
        });
      }

      /**
       * Check uploaded files
       *
       * upload.fields() gives:
       *
       * req.files = {
       *   license: [file],
       *   cv: [file]
       * }
       */

      const licenseFile = req.files?.license?.[0];
      const cvFile = req.files?.cv?.[0];

      if (!licenseFile) {
        return res.status(400).json({
          message: "Nursing license/certificate is required",
        });
      }

      if (!cvFile) {
        return res.status(400).json({
          message: "CV is required",
        });
      }
    }

    /**
     * =========================
     * CHECK EMAIL
     * =========================
     */

    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    /**
     * =========================
     * HASH PASSWORD
     * =========================
     */

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    /**
     * =========================
     * START TRANSACTION
     * =========================
     *
     * Important for Nurse:
     *
     * users + nurse_profiles
     *
     * should succeed together.
     */

    connection = await pool.getConnection();

    await connection.beginTransaction();

    /**
     * =========================
     * CREATE USER
     * =========================
     */

    const [userResult] = await connection.query(
      `
      INSERT INTO users
      (
        first_name,
        last_name,
        email,
        password,
        phone,
        role
      )
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        finalFirstName,
        finalLastName,
        email,
        hashedPassword,
        phone || null,
        role,
      ]
    );

    const userId = userResult.insertId;

    /**
     * =========================
     * CREATE NURSE PROFILE
     * =========================
     */

    if (role === "nurse") {
      const licenseFile =
        req.files?.license?.[0];

      const cvFile =
        req.files?.cv?.[0];

      /**
       * Store relative file paths
       *
       * Example:
       * uploads/licenses/license-123.pdf
       */

      const licensePath =
        licenseFile.path.replace(/\\/g, "/");

      const cvPath =
        cvFile.path.replace(/\\/g, "/");

      await connection.query(
        `
        INSERT INTO nurse_profiles
        (
          user_id,
          specialization,
          experience,
          location,
          license_file,
          cv_file,
          status,
          price,
          rating,
          reviews
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          userId,
          specialization,
          yearsExperience,
          location,
          licensePath,
          cvPath,
          "pending",
          0,
          0,
          0,
        ]
      );
    }

    /**
     * =========================
     * COMMIT
     * =========================
     */

    await connection.commit();

    /**
     * =========================
     * CREATE JWT
     * =========================
     */

    const token = jwt.sign(
      {
        id: userId,
        email,
        role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    /**
     * =========================
     * COOKIE
     * =========================
     */

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    /**
     * =========================
     * RESPONSE
     * =========================
     */

    return res.status(201).json({
      message:
        role === "nurse"
          ? "Nurse registration submitted successfully. Your account is pending verification."
          : "User registered successfully",

      user: {
        id: userId,
        first_name: finalFirstName,
        last_name: finalLastName,
        email,
        phone: phone || null,
        role,
      },
    });
  } catch (error) {
    /**
     * =========================
     * ROLLBACK
     * =========================
     */

    if (connection) {
      await connection.rollback();
    }

    console.error("Register error:", error);

    return res.status(500).json({
      message:
        error.message || "Internal server error",
    });
  } finally {
    /**
     * =========================
     * RELEASE CONNECTION
     * =========================
     */

    if (connection) {
      connection.release();
    }
  }
};












export const logout = async (req, res) => {
  try {
      // تفريغ الكوكي بنفس الاسم والخيارات التي أُنشئ بها
      res.cookie("token", "", {
          httpOnly: true,
          expires: new Date(0), // جعل الصلاحية منتهية فوراً
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
      });

      return res.status(200).json({
          success: true,
          message: "Logged out successfully",
      });
  } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({
          success: false,
          message: "Server error during logout",
      });
  }
};



























const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({ success: false, message: "Credential token is required" });
    }

    // 1. فحص التوكن القادم من جوجل والتأكد من صحته
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name } = payload;

    // 2. فحص هل المستخدم مسجل في قاعدة البيانات
    const [existingUsers] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email.toLowerCase().trim()]
    );

    let user;

    if (existingUsers.length > 0) {
      user = existingUsers[0];
    } else {
      // 3. إذا كان مستخدم جديد نسجله تلقائياً بدور patient
      const [result] = await pool.execute(
        `INSERT INTO users (first_name, last_name, email, password, role)
         VALUES (?, ?, ?, ?, 'patient')`,
        [
          given_name || "User",
          family_name || "",
          email.toLowerCase().trim(),
          "google_authenticated_oauth", // كلمة مرور رمزية لحسابات جوجل
        ]
      );

      user = {
        id: result.insertId,
        first_name: given_name || "User",
        last_name: family_name || "",
        email: email.toLowerCase().trim(),
        role: "patient",
      };
    }

    // 4. إنشاء JWT توكن الخاص بنظامك
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "your_jwt_secret_key",
      { expiresIn: "7d" }
    );

    // 5. تعيين الكوكي
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in with Google successfully",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({
      success: false,
      message: "Google login verification failed",
    });
  }
};










export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // 1. البحث عن المستخدم بالبريد
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email.toLowerCase().trim()]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    const user = users[0];

    // 2. التحقق من كلمة المرور
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials",
      });
    }

    // 3. التحقق الحاسم من الدور: يجب أن يكون admin حصراً
    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied: You do not have administrative privileges",
      });
    }

    // 4. إنشاء JWT خاص بالمدير
    const token = jwt.sign(
      { id: user.id, email: user.email, role: "admin" },
      process.env.JWT_SECRET || "my_super_secret_key_123456",
      { expiresIn: "1d" }
    );

    // 5. حفظ التوكن في الكوكي
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Admin authenticated successfully",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: "admin",
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error during admin authentication",
    });
  }
};