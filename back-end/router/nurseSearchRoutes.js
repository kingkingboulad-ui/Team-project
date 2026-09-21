import express from 'express';
import { getNurses } from '../controllers/nurseSearchController.js';

const router = express.Router();

// GET /api/nurses (يدعم req.query: careType, location)
router.get('/', getNurses);

export default router;