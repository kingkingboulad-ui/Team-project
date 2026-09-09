
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/DBConnect.js";

export const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      phone
    } = req.body;

    // 1. Validate data
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: "First name, last name, email and password are required"
      });
    }

    // 2. Check if email already exists
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({
        message: "Email already exists"
      });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Create user
    const [result] = await pool.query(
      `INSERT INTO users
      (first_name, last_name, email, password, phone)
      VALUES (?, ?, ?, ?, ?)`,
      [
        first_name,
        last_name,
        email,
        hashedPassword,
        phone || null
      ]
    );

    // 5. Create JWT token
    const token = jwt.sign(
      {
        id: result.insertId,
        email: email,
        role: "user"
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // 6. Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 7. Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        first_name,
        last_name,
        email,
        phone: phone || null,
        role: "user"
      }
    });

  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};






export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      });
    }

    // 2. Find user
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const user = users[0];

    // 3. Compare password with hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    // 4. Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    // 5. Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // 6. Response
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};



