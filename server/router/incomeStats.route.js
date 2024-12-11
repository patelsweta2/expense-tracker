import express from "express";
import { accountStatsCtrl } from "../controller/accountStatus";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, accountStatsCtrl);
export default router;
