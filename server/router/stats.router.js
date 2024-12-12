import express from "express";
import { statsCtrl } from "../controller/stats.controller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, statsCtrl);
export default router;
