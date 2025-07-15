import express from 'express';
import { getFormsByServiceId } from '../controller/formsController.js';

const router = express.Router();

router.get('/service/:service_id', getFormsByServiceId);

export default router;