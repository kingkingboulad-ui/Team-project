import db from "../config/DBConnect.js";

export const createCareRequest = async (req, res) => {
  try {
    const userId = req.user.id; // من auth middleware
    const {
      preferredNurseId,
      careForLabel,
      careForId,
      careTypeLabel,
      careTypeId,
      startDate,
      careDuration,
      careAddress,
      latitude,
      longitude,
      notes,
    } = req.body;

    // تنظيف البيانات والتأكد من القيم الأساسية
    const nurseId = preferredNurseId ? Number(preferredNurseId) : null;
    const careFor = careForLabel || careForId;
    const careType = careTypeLabel || careTypeId;

    if (!startDate || !careDuration || !careAddress) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (date, duration, address).",
      });
    }

    const [result] = await db.query(
      `INSERT INTO care_requests (
        user_id,
        preferred_nurse_id,
        care_for,
        care_type,
        start_date,
        duration,
        address,
        latitude,
        longitude,
        notes,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        userId,
        nurseId,
        careFor,
        careType,
        startDate,
        careDuration,
        careAddress,
        latitude || null,
        longitude || null,
        notes || null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Care request created successfully",
      requestId: result.insertId,
    });
  } catch (error) {
    console.error("Booking submission error:", error);
    return res.status(500).json({
      success: false,
      message: "Database error while processing your care request.",
    });
  }
};