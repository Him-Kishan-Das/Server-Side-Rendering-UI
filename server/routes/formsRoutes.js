import express from 'express';
import { getForms, getFormsByServiceId } from '../controller/formsController.js';

const router = express.Router();

router.get('/service/:service_id', getFormsByServiceId);
router.get('/', getForms);

export default router;