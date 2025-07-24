import express from "express";
import {
    saveStepByNumber,
    submitForm,
    getUserApplication,
    getStepByNumber,
  } from "../controller/applicationController.js";
  

const router = express.Router();

// Save specific step data (by step number)
router.post("/application/save-step/:stepNumber", saveStepByNumber);

// Submit final form
router.post("/application/submit", submitForm);

// Get full user application
router.get("/application", getUserApplication);
// GET /application/step/:stepNumber?user_id=...&service_id=... 

router.get("/application/step/:stepNumber", getStepByNumber);
// GET /application/step/2?user_id=user123&service_id=1001 


export default router;
