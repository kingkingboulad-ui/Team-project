import { GoogleGenAI } from '@google/genai';
import pool from '../config/DBConnect.js';

const ai = new GoogleGenAI();

export const analyzeCareNeeds = async (req, res) => {
  try {
    const { prompt } = req.body;

    // =====================================================
    // 1. التحقق من الـ prompt
    // =====================================================

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({
        success: false,
        message: 'يرجى كتابة الشكوى أو الحالة',
      });
    }

    // =====================================================
    // 2. جلب الممرضين المتاحين
    // =====================================================

    const [nurses] = await pool.execute(`
      SELECT
        np.id,
        CONCAT(u.first_name, ' ', u.last_name) AS full_name,
        np.specialization,
        np.experience,
        np.location,
        np.price,
        np.rating,
        np.image,
        np.cv_file,
        COALESCE(
          GROUP_CONCAT(nc.category SEPARATOR ', '),
          'General'
        ) AS categories

      FROM nurse_profiles np

      JOIN users u
        ON np.user_id = u.id

      LEFT JOIN nurse_categories nc
        ON np.id = nc.nurse_id

      WHERE np.status = 'approved'

      GROUP BY
        np.id,
        u.first_name,
        u.last_name,
        np.specialization,
        np.experience,
        np.location,
        np.price,
        np.rating,
        np.image,
        np.cv_file
    `);

    // =====================================================
    // 3. لا يوجد ممرضين
    // =====================================================

    if (!nurses || nurses.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'لا يوجد ممرضون متاحون حالياً',
      });
    }

    // =====================================================
    // 4. تجهيز بيانات الممرضين للـ AI
    // =====================================================

    const compactNursesList = nurses
      .map((nurse) => {
        return [
          `ID:${nurse.id}`,
          `Name:${nurse.full_name}`,
          `Specialization:${nurse.specialization || 'General'}`,
          `Experience:${nurse.experience || 0}`,
          `City:${nurse.location || 'Unknown'}`,
          `Price:${nurse.price || 0}`,
          `Rating:${nurse.rating || 0}`,
          `Tags:${nurse.categories || 'General'}`,
        ].join('|');
      })
      .join('\n');

    // =====================================================
    // 5. Prompt الخاص بالـ AI
    // =====================================================

    const instruction = `
You are a healthcare care-matching assistant.

Your job is to analyze the patient's situation and recommend the most suitable APPROVED nurse from the provided list.

IMPORTANT RULES:

1. Do NOT invent a nurse.
2. recommendedNurseId MUST be one of the IDs provided in the nurse list.
3. Choose only ONE nurse.
4. Use specialization, experience, location, rating and categories when matching.
5. Do not provide a definitive medical diagnosis.
6. Give general care guidance only.
7. If the situation appears potentially life-threatening, set isEmergency to true and urgencyLevel to "Emergency".
8. If the situation is not clearly an emergency, do not mark it as Emergency.
9. Return ONLY valid JSON.
10. Do not return Markdown.
11. Do not use code blocks.
12. All JSON strings must be valid JSON strings.

Patient situation:
"${prompt.trim()}"

Available approved nurses:

${compactNursesList}

Return exactly this JSON structure:

{
  "assessment": "Brief general assessment in 1-2 sentences",
  "careType": "Type of care needed",
  "urgencyLevel": "Routine",
  "isEmergency": false,
  "vitalsToMonitor": [
    "Vital sign 1",
    "Vital sign 2"
  ],
  "keyRecommendations": [
    "Recommendation 1",
    "Recommendation 2",
    "Recommendation 3"
  ],
  "recommendedNurseId": 1,
  "matchReason": "Short explanation of why this nurse matches the patient's needs"
}

Allowed urgencyLevel values:

"Routine"
"Moderate"
"High"
"Emergency"

Remember:
recommendedNurseId MUST be an ID from the available nurses list.
`;

    // =====================================================
    // 6. Models + Retry
    // =====================================================

    const models = [
      'gemini-2.5-flash-lite',
      'gemini-3.6-flash',
    ];

    let response = null;
    let lastError = null;

    for (const model of models) {
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          console.log(
            `Trying Gemini model: ${model} | Attempt: ${attempt}`
          );

          response = await ai.models.generateContent({
            model,
            contents: instruction,
            config: {
              responseMimeType: 'application/json',
            },
          });

          if (response && response.text) {
            console.log(
              `Gemini success using model: ${model}`
            );

            break;
          }

        } catch (error) {
          lastError = error;

          console.error(
            `Gemini error | Model: ${model} | Attempt: ${attempt}`,
            error?.message || error
          );

          // انتظار قبل إعادة المحاولة
          if (attempt < 2) {
            await new Promise((resolve) => {
              setTimeout(resolve, 1500);
            });
          }
        }
      }

      // إذا نجح الموديل لا داعي لتجربة موديل آخر
      if (response?.text) {
        break;
      }
    }

    // =====================================================
    // 7. جميع موديلات Gemini فشلت
    // =====================================================

    if (!response || !response.text) {
      console.error(
        'All Gemini models failed:',
        lastError
      );

      return res.status(503).json({
        success: false,
        message:
          'خدمة الذكاء الاصطناعي غير متاحة حالياً. يرجى المحاولة بعد قليل.',
      });
    }

    // =====================================================
    // 8. تنظيف JSON
    // =====================================================

    let cleanText = response.text.trim();

    // إزالة Markdown إذا رجعها الموديل رغم طلب JSON فقط
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText
        .replace(/^```json/, '')
        .replace(/```$/, '')
        .trim();
    } else if (cleanText.startsWith('```')) {
      cleanText = cleanText
        .replace(/^```/, '')
        .replace(/```$/, '')
        .trim();
    }

    // =====================================================
    // 9. تحويل JSON
    // =====================================================

    let parsedResult;

    try {
      parsedResult = JSON.parse(cleanText);
    } catch (jsonError) {
      console.error(
        'Invalid JSON returned from Gemini:',
        cleanText
      );

      return res.status(502).json({
        success: false,
        message:
          'تم استلام استجابة غير صالحة من خدمة الذكاء الاصطناعي.',
      });
    }

    // =====================================================
    // 10. التحقق من Nurse ID
    // =====================================================

    const recommendedNurseId = Number(
      parsedResult.recommendedNurseId
    );

    let matchedNurse = nurses.find(
      (nurse) =>
        Number(nurse.id) === recommendedNurseId
    );

    // إذا أعطى AI ID غير موجود
    // نستخدم أول ممرض كـ fallback
    if (!matchedNurse) {
      matchedNurse = nurses[0];
    }

    // =====================================================
    // 11. التأكد من urgencyLevel
    // =====================================================

    const allowedUrgencyLevels = [
      'Routine',
      'Moderate',
      'High',
      'Emergency',
    ];

    const urgencyLevel =
      allowedUrgencyLevels.includes(
        parsedResult.urgencyLevel
      )
        ? parsedResult.urgencyLevel
        : 'Moderate';

    // =====================================================
    // 12. التأكد من Arrays
    // =====================================================

    const vitalsToMonitor = Array.isArray(
      parsedResult.vitalsToMonitor
    )
      ? parsedResult.vitalsToMonitor
      : [];

    const keyRecommendations = Array.isArray(
      parsedResult.keyRecommendations
    )
      ? parsedResult.keyRecommendations
      : [];

    // =====================================================
    // 13. النتيجة النهائية
    // =====================================================

    return res.status(200).json({
      success: true,

      analysis: {
        assessment:
          parsedResult.assessment ||
          'General care assessment required.',

        careType:
          parsedResult.careType ||
          'General Care',

        urgencyLevel,

        isEmergency:
          urgencyLevel === 'Emergency' ||
          Boolean(parsedResult.isEmergency),

        vitalsToMonitor,

        keyRecommendations,

        matchReason:
          parsedResult.matchReason ||
          'This nurse matches the requested care needs.',

        recommendedNurseId: matchedNurse.id,
      },

      nurse: matchedNurse,
    });

  } catch (error) {
    // =====================================================
    // Final Error Handler
    // =====================================================

    console.error(
      'AI Controller Final Error:',
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        'Failed to process request',
    });
  }
};