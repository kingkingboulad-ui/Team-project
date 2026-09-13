
import pool from "../config/DBConnect.js";

export const applyAsNurse = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            specialization,
            experience,
            location,
            price
        } = req.body;

        const licenseFile = req.files?.licenseFile?.[0];
        const cvFile = req.files?.cvFile?.[0];

        if (!specialization || !experience || !location || !price) {
            return res.status(400).json({
                message: "All nurse information is required"
            });
        }

        if (!licenseFile || !cvFile) {
            return res.status(400).json({
                message: "License and CV are required"
            });
        }

        // Check if user already applied
        const [existing] = await pool.execute(
            `
            SELECT id, status
            FROM nurse_profiles
            WHERE user_id = ?
            `,
            [userId]
        );

        if (existing.length > 0) {
            return res.status(409).json({
                message: "You already submitted a nurse application",
                status: existing[0].status
            });
        }

        const licensePath =
            `/uploads/licenses/${licenseFile.filename}`;

        const cvPath =
            `/uploads/cvs/${cvFile.filename}`;

        const [result] = await pool.execute(
            `
            INSERT INTO nurse_profiles
            (
                user_id,
                specialization,
                experience,
                location,
                license_file,
                cv_file,
                price
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `,
            [
                userId,
                specialization,
                experience,
                location,
                licensePath,
                cvPath,
                price
            ]
        );

        res.status(201).json({
            message: "Nurse application submitted successfully",
            nurseId: result.insertId
        });

    } catch (error) {
        console.error("Apply nurse error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
export const getMyNurseProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const [rows] = await pool.execute(
            `
            SELECT
                np.id,
                np.specialization,
                np.experience,
                np.location,
                np.price,
                np.rating,
                np.reviews,
                np.license_file,
                np.cv_file,
                np.status,
                np.created_at,
                np.updated_at,

                u.id AS user_id,
                u.first_name,
                u.last_name,
                u.email,
                u.phone

            FROM nurse_profiles np

            INNER JOIN users u
                ON np.user_id = u.id

            WHERE np.user_id = ?
            `,
            [userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Nurse profile not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};




export const getAllNurses = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `
            SELECT
                np.id,
                np.user_id,
                np.specialization,
                np.experience,
                np.location,
                np.price,
                np.rating,
                np.reviews,
                np.license_file,
                np.cv_file,
                np.status,
                np.created_at,

                u.first_name,
                u.last_name,
                u.email,
                u.phone

            FROM nurse_profiles np

            INNER JOIN users u
                ON np.user_id = u.id

            ORDER BY np.created_at DESC
            `
        );

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};





export const getNurseById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.execute(
            `
            SELECT
                np.id,
                np.user_id,
                np.specialization,
                np.experience,
                np.location,
                np.license_file,
                np.cv_file,
                np.status,
                np.price,
                np.rating,
                np.reviews,
                np.created_at,
                np.updated_at,

                u.first_name,
                u.last_name,
                CONCAT(u.first_name, ' ', u.last_name) AS fullName,
                u.email,
                u.phone

            FROM nurse_profiles np

            INNER JOIN users u
                ON np.user_id = u.id

            WHERE np.id = ?
            `,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Nurse not found"
            });
        }

        res.status(200).json({
            success: true,
            nurse: rows[0]
        });

    } catch (error) {
        console.error("Get nurse by ID error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


export const updateNurseStatus = async (req, res) => {

    try {

        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "approved",
            "rejected"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status"
            });
        }

        const [result] = await pool.execute(
            `
            UPDATE nurse_profiles
            SET status = ?
            WHERE id = ?
            `,
            [status, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Nurse application not found"
            });
        }

        res.json({
            message: `Nurse application ${status}`
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};



export const getNurses = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT
                np.id,
                np.user_id,

                CONCAT(u.first_name, ' ', u.last_name) AS name,
                CONCAT(u.first_name, ' ', u.last_name) AS fullName,

                np.specialization AS role,
                np.specialization,
                np.price,
                np.location,
                np.experience,
                np.rating,
                np.reviews,

                np.license_file

            FROM nurse_profiles np

            INNER JOIN users u
                ON np.user_id = u.id

            WHERE np.status = 'approved'
              AND u.role = 'user'

            ORDER BY np.created_at DESC
        `);

        res.status(200).json({
            success: true,
            nurses: rows
        });

    } catch (error) {
        console.error("Get nurses error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to get nurses"
        });
    }
};