import express from "express";
import { accountStatsCtrl } from "../controller/accountStatus.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", authMiddleware, accountStatsCtrl);
export default router;
