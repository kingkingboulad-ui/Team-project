import pool from "../config/DBConnect.js";

/* =========================================================
   GET ADMIN DASHBOARD STATS & CARE REQUESTS
========================================================= */
export const getDashboardStats = async (req, res) => {
  try {
    // 1. إحصائيات المرضى والممرضين
    const [patientsCount] = await pool.execute(
      `SELECT COUNT(*) AS total FROM users WHERE role = 'patient' OR role = 'user'`
    );

    const [activeNurses] = await pool.execute(
      `SELECT COUNT(*) AS total FROM nurse_profiles WHERE status = 'approved'`
    );

    const [pendingNurseProfiles] = await pool.execute(
      `SELECT COUNT(*) AS total FROM nurse_profiles WHERE status = 'pending'`
    );

    // 2. إحصائيات طلبات الرعاية لليوم وطلبات الرعاية المعلقة
    const [todaysRequests] = await pool.execute(
      `SELECT COUNT(*) AS total FROM care_requests WHERE DATE(start_date) = CURDATE()`
    );

    const [pendingCareRequests] = await pool.execute(
      `SELECT COUNT(*) AS total FROM care_requests WHERE status = 'pending'`
    );

    // 3. جلب جميع طلبات الرعاية مع بيانات المريض والممرض
    const [allRequests] = await pool.execute(
      `
      SELECT 
          cr.id,
          cr.user_id AS patient_id,
          CONCAT(COALESCE(u_patient.first_name, ''), ' ', COALESCE(u_patient.last_name, '')) AS patient_name,
          u_patient.phone AS patient_phone,
          cr.preferred_nurse_id AS nurse_id,
          CONCAT(COALESCE(u_nurse.first_name, ''), ' ', COALESCE(u_nurse.last_name, '')) AS nurse_name,
          np.specialization AS nurse_role,
          cr.care_for,
          cr.care_type,
          cr.start_date,
          cr.duration,
          cr.address,
          cr.notes,
          cr.status,
          cr.created_at
      FROM care_requests cr
      LEFT JOIN users u_patient ON cr.user_id = u_patient.id
      LEFT JOIN nurse_profiles np ON cr.preferred_nurse_id = np.id
      LEFT JOIN users u_nurse ON np.user_id = u_nurse.id
      ORDER BY cr.id DESC
      `
    );

    return res.status(200).json({
      success: true,
      stats: {
        totalPatients: patientsCount[0]?.total || 0,
        activeNurses: activeNurses[0]?.total || 0,
        pendingRequests: pendingNurseProfiles[0]?.total || 0,
        todaysAppointments: todaysRequests[0]?.total || 0,
        pendingCareRequests: pendingCareRequests[0]?.total || 0,
      },
      recentAppointments: allRequests,
    });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to load dashboard stats",
    });
  }
};