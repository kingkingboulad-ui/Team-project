import pool from '../config/DBConnect.js';

export const getNurses = async (req, res) => {
  try {
    const { careType, location } = req.query;

    console.log("👉 [Backend Search Query]:", { careType, location });

    let query = `
      SELECT 
        np.id,
        CONCAT(u.first_name, ' ', u.last_name) AS full_name,
        np.specialization,
        np.experience,
        np.location,
        np.price,
        np.rating,
        np.reviews,
        np.image,
        np.cv_file,
        np.status,
        COALESCE(GROUP_CONCAT(nc.category SEPARATOR ', '), 'General Care') AS categories
      FROM nurse_profiles np
      JOIN users u ON np.user_id = u.id
      LEFT JOIN nurse_categories nc ON np.id = nc.nurse_id
      WHERE np.status = 'approved'
    `;

    const params = [];

    // 1. فلترة الموقع الجغرافي
    if (location && location.trim() !== '') {
      query += ` AND LOWER(np.location) LIKE LOWER(?)`;
      params.push(`%${location.trim()}%`);
    }

    query += ` GROUP BY np.id`;

    // 2. فلترة التخصص
    if (careType && careType !== 'All' && careType.trim() !== '') {
      query += ` HAVING LOWER(categories) LIKE LOWER(?) OR LOWER(np.specialization) LIKE LOWER(?)`;
      params.push(`%${careType.trim()}%`, `%${careType.trim()}%`);
    }

    query += ` ORDER BY np.id DESC`;

    const [nurses] = await pool.execute(query, params);

    console.log(`✅ [Backend Result]: Found ${nurses.length} nurses`);

    return res.status(200).json({
      success: true,
      count: nurses.length,
      nurses,
    });
  } catch (error) {
    console.error('Fetch nurses search error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
};