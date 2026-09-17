
import pool from "../config/DBConnect.js";

/* =========================================================
   CATEGORIES
========================================================= */

const NURSE_CATEGORIES = [
    "Elderly Care",
    "Post-Surgery",
    "Medication Support",
    "Daily Assistance",
    "Disability Support",
    "Palliative Care",
    "Companionship"
];


/* =========================================================
   APPLY AS NURSE
========================================================= */

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

        const nurseId = result.insertId;

        /*
         * New nurses get all categories for now.
         * Existing nurses already have different categories
         * in nurse_categories.
         */
        for (const category of NURSE_CATEGORIES) {
            await pool.execute(
                `
                INSERT INTO nurse_categories
                (
                    nurse_id,
                    category
                )
                VALUES (?, ?)
                `,
                [nurseId, category]
            );
        }

        res.status(201).json({
            message: "Nurse application submitted successfully",
            nurseId
        });

    } catch (error) {
        console.error("Apply nurse error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


/* =========================================================
   GET MY NURSE PROFILE
========================================================= */

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
                np.image,
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

        const nurse = rows[0];

        /* Get nurse categories */
        const [categories] = await pool.execute(
            `
            SELECT category
            FROM nurse_categories
            WHERE nurse_id = ?
            ORDER BY id ASC
            `,
            [nurse.id]
        );

        nurse.categories = categories.map(
            (item) => item.category
        );

        res.json(nurse);

    } catch (error) {
        console.error(
            "Get my nurse profile error:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


/* =========================================================
   GET ALL NURSES
========================================================= */

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
                np.image,
                np.license_file,
                np.cv_file,
                np.status,
                np.created_at,
                u.first_name,
                u.last_name,
                u.email,
                u.phone,
                CONCAT(
                    u.first_name,
                    ' ',
                    u.last_name
                ) AS fullName
            FROM nurse_profiles np
            INNER JOIN users u
                ON np.user_id = u.id
            ORDER BY np.created_at DESC
            `
        );

        /* Get all categories */
        const [categories] = await pool.execute(
            `
            SELECT
                nurse_id,
                category
            FROM nurse_categories
            ORDER BY id ASC
            `
        );

        /* Attach categories to each nurse */
        const nursesWithCategories = rows.map((nurse) => {

            const nurseCategories = categories
                .filter(
                    (item) =>
                        Number(item.nurse_id) ===
                        Number(nurse.id)
                )
                .map(
                    (item) => item.category
                );

            return {
                ...nurse,
                categories: nurseCategories
            };
        });

        res.json(nursesWithCategories);

    } catch (error) {
        console.error(
            "Get all nurses error:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


/* =========================================================
   GET NURSE BY ID
========================================================= */

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
                np.image,
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
                CONCAT(
                    u.first_name,
                    ' ',
                    u.last_name
                ) AS fullName,
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

        const nurse = rows[0];

        /* Get categories for this nurse */
        const [categories] = await pool.execute(
            `
            SELECT category
            FROM nurse_categories
            WHERE nurse_id = ?
            ORDER BY id ASC
            `,
            [id]
        );

        nurse.categories = categories.map(
            (item) => item.category
        );

        res.status(200).json({
            success: true,
            nurse
        });

    } catch (error) {
        console.error(
            "Get nurse by ID error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


/* =========================================================
   UPDATE NURSE STATUS
========================================================= */

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
        console.error(
            "Update nurse status error:",
            error
        );

        res.status(500).json({
            message: "Server error"
        });
    }
};


/* =========================================================
   GET APPROVED NURSES
   Used by Find a Nurse page
========================================================= */

export const getNurses = async (req, res) => {
    try {

        const [rows] = await pool.execute(
            `
            SELECT
                np.id,
                np.user_id,

                CONCAT(
                    u.first_name,
                    ' ',
                    u.last_name
                ) AS name,

                CONCAT(
                    u.first_name,
                    ' ',
                    u.last_name
                ) AS fullName,

                np.specialization AS role,
                np.specialization,

                np.price,
                np.location,
                np.experience,
                np.rating,
                np.reviews,

                np.image

            FROM nurse_profiles np

            INNER JOIN users u
                ON np.user_id = u.id

            WHERE np.status = 'approved'

            ORDER BY np.created_at DESC
            `
        );

        /* Get categories for all nurses */
        const [categories] = await pool.execute(
            `
            SELECT
                nurse_id,
                category
            FROM nurse_categories
            ORDER BY id ASC
            `
        );

        /* Attach categories to each nurse */
        const nursesWithCategories = rows.map((nurse) => {

            const nurseCategories = categories
                .filter(
                    (item) =>
                        Number(item.nurse_id) ===
                        Number(nurse.id)
                )
                .map(
                    (item) => item.category
                );

            return {
                ...nurse,
                categories: nurseCategories
            };
        });

        res.status(200).json({
            success: true,
            nurses: nursesWithCategories
        });

    } catch (error) {
        console.error(
            "Get nurses error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to get nurses"
        });
    }
};


/* =========================================================
   GET USER / NURSE PROFILE
========================================================= */

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            `
            SELECT
                u.id,
                u.first_name,
                u.last_name,
                u.email,
                u.phone,

                np.id AS nurse_id,
                np.user_id,

                np.specialization,
                np.experience,

                np.image,

                np.license_file,
                np.location,
                np.cv_file,

                np.status,
                np.created_at,
                np.updated_at,

                np.price,
                np.rating,
                np.reviews

            FROM users u

            LEFT JOIN nurse_profiles np
                ON u.id = np.user_id

            WHERE u.id = ?
            `,
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Nurse not found"
            });
        }

        const nurse = rows[0];

        /* Get categories if this user is a nurse */
        if (nurse.nurse_id) {

            const [categories] = await pool.execute(
                `
                SELECT category
                FROM nurse_categories
                WHERE nurse_id = ?
                ORDER BY id ASC
                `,
                [nurse.nurse_id]
            );

            nurse.categories = categories.map(
                (item) => item.category
            );

        } else {
            nurse.categories = [];
        }

        res.status(200).json({
            success: true,
            nurse
        });

    } catch (error) {
        console.error(
            "Get user profile error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};
