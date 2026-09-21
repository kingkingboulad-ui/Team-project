import express from 'express';
import { analyzeCareNeeds } from '../controllers/aiCareAssistantController.js'; // تأكد من اسم ومسار الـ controller لديك

const router = express.Router();

// POST /api/ai/care-assistant
router.post('/care-assistant', analyzeCareNeeds);

export default router;