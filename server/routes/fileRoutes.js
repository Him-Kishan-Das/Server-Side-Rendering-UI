import express from "express";
import upload from "../middleware/upload.js";
import { uploadFile } from "../controller/fileController.js";

const router = express.Router();

// Route to upload files
router.post("/upload", upload.single("file"), uploadFile);

export default router;