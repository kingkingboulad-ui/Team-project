import pool from "../config/DBConnect.js";
import bcrypt from "bcryptjs";

/* =========================================================
   GET ALL PATIENTS (مع دعم البحث والترقيم)
========================================================= */
export const getAllPatients = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 10 } = req.query;
        const offset = (Number(page) - 1) * Number(limit);

        const searchQuery = `%${search.trim()}%`;

        // استعلام جلب المرضى
        const [patients] = await pool.execute(
            `
            SELECT 
                id,
                first_name,
                last_name,
                CONCAT(first_name, ' ', last_name) AS fullName,
                email,
                phone,
                role,
                created_at,
                updated_at
            FROM users
            WHERE (role = 'patient' OR role = 'user')
              AND (
                  first_name LIKE ? 
                  OR last_name LIKE ? 
                  OR email LIKE ? 
                  OR phone LIKE ?
              )
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            `,
            [searchQuery, searchQuery, searchQuery, searchQuery, String(Number(limit)), String(offset)]
        );

        // حساب إجمالي عدد المرضى للترقيم
        const [totalRows] = await pool.execute(
            `
            SELECT COUNT(*) AS count
            FROM users
            WHERE (role = 'patient' OR role = 'user')
              AND (
                  first_name LIKE ? 
                  OR last_name LIKE ? 
                  OR email LIKE ? 
                  OR phone LIKE ?
              )
            `,
            [searchQuery, searchQuery, searchQuery, searchQuery]
        );

        const total = totalRows[0]?.count || 0;

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / Number(limit)),
            patients
        });

    } catch (error) {
        console.error("Get all patients error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch patients"
        });
    }
};

/* =========================================================
   GET PATIENT BY ID
========================================================= */
export const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute(
            `
            SELECT 
                id,
                first_name,
                last_name,
                CONCAT(first_name, ' ', last_name) AS fullName,
                email,
                phone,
                role,
                created_at,
                updated_at
            FROM users
            WHERE id = ? AND (role = 'patient' OR role = 'user')
            `,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        res.status(200).json({
            success: true,
            patient: rows[0]
        });

    } catch (error) {
        console.error("Get patient by ID error:", error);
        res.status(500).json({
            success: false,
            message: "Server error retrieving patient profile"
        });
    }
};

/* =========================================================
   CREATE NEW PATIENT (إضافة مريض يدوي بواسطة الأدمن)
========================================================= */
export const createPatient = async (req, res) => {
    try {
        const { first_name, last_name, email, password, phone } = req.body;

        if (!first_name || !last_name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "First name, last name, email, and password are required"
            });
        }

        // التحقق من تكرار البريد الإلكتروني
        const [existing] = await pool.execute(
            `SELECT id FROM users WHERE email = ?`,
            [email.toLowerCase().trim()]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });
        }

        // تشفير كلمة المرور
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await pool.execute(
            `
            INSERT INTO users (first_name, last_name, email, password, phone, role)
            VALUES (?, ?, ?, ?, ?, 'patient')
            `,
            [
                first_name.trim(),
                last_name.trim(),
                email.toLowerCase().trim(),
                hashedPassword,
                phone ? phone.trim() : null
            ]
        );

        res.status(201).json({
            success: true,
            message: "Patient created successfully",
            patientId: result.insertId
        });

    } catch (error) {
        console.error("Create patient error:", error);
        res.status(500).json({
            success: false,
            message: "Server error creating patient"
        });
    }
};

/* =========================================================
   UPDATE PATIENT
========================================================= */
export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { first_name, last_name, email, phone, password } = req.body;

        // التأكد من وجود المريض
        const [patient] = await pool.execute(
            `SELECT id, password FROM users WHERE id = ? AND (role = 'patient' OR role = 'user')`,
            [id]
        );

        if (patient.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Patient not found"
            });
        }

        // في حال تم تغيير الإيميل التأكد من عدم أخذه من حساب آخر
        if (email) {
            const [emailCheck] = await pool.execute(
                `SELECT id FROM users WHERE email = ? AND id != ?`,
                [email.toLowerCase().trim(), id]
            );

            if (emailCheck.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "Email is already in use by another user"
                });
            }
        }

        // تحديث كلمة المرور إن تم إرسالها جديدة
        let finalPassword = patient[0].password;
        if (password && password.trim() !== "") {
            const salt = await bcrypt.genSalt(10);
            finalPassword = await bcrypt.hash(password, salt);
        }

        await pool.execute(
            `
            UPDATE users
            SET 
                first_name = COALESCE(?, first_name),
                last_name = COALESCE(?, last_name),
                email = COALESCE(?, email),
                phone = COALESCE(?, phone),
                password = ?
            WHERE id = ?
            `,
            [
                first_name?.trim() || null,
                last_name?.trim() || null,
                email?.toLowerCase().trim() || null,
                phone?.trim() || null,
                finalPassword,
                id
            ]
        );

        res.status(200).json({
            success: true,
            message: "Patient updated successfully"
        });

    } catch (error) {
        console.error("Update patient error:", error);
        res.status(500).json({
            success: false,
            message: "Server error updating patient"
        });
    }
};

/* =========================================================
   DELETE PATIENT
========================================================= */
export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.execute(
            `DELETE FROM users WHERE id = ? AND (role = 'patient' OR role = 'user')`,
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Patient not found or already deleted"
            });
        }

        res.status(200).json({
            success: true,
            message: "Patient deleted successfully"
        });

    } catch (error) {
        console.error("Delete patient error:", error);
        res.status(500).json({
            success: false,
            message: "Server error deleting patient"
        });
    }
};










export const getPatientProfileAndRequests = async (req, res) => {
    try {
      const userId = req.user?.id;
  
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "No user id found in token",
        });
      }
  
      // 1. جلب بيانات المريض
      const [userRows] = await pool.query(
        "SELECT id, first_name, last_name, email, phone, role, created_at FROM users WHERE id = ?",
        [userId]
      );
  
      if (!userRows || userRows.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
        });
      }
  
      const patient = userRows[0];
  
      // 2. استعلام الحجوزات مع مراعاة أسماء الحقول الشائعة
      let requests = [];
      try {
        const [requestRows] = await pool.query(
          `SELECT 
            cr.id,
            cr.care_for,
            cr.care_type,
            cr.start_date,
            cr.duration,
            cr.address,
            cr.notes,
            cr.status,
            cr.created_at,
            CONCAT(nu.first_name, ' ', nu.last_name) AS nurse_name,
            nu.phone AS nurse_phone,
            np.specialization AS nurse_specialization
          FROM care_requests cr
          LEFT JOIN nurse_profiles np ON cr.preferred_nurse_id = np.id
          LEFT JOIN users nu ON np.user_id = nu.id
          WHERE cr.user_id = ?
          ORDER BY cr.created_at DESC`,
          [userId]
        );
        requests = requestRows;
      } catch (queryErr) {
        // لو كان هناك حقل غير موجود في جدول care_requests، نجلب الحقول الأساسية فقط حتى لا تنهار الصفحة
        console.error("Care Requests Query Error:", queryErr.message);
        const [fallbackRows] = await pool.query(
          "SELECT * FROM care_requests WHERE user_id = ? ORDER BY id DESC",
          [userId]
        );
        requests = fallbackRows;
      }
  
      return res.status(200).json({
        success: true,
        patient,
        requests,
      });
    } catch (error) {
      console.error("Patient Controller Error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };

