import { signUp, login, logout } from "../controller/user.controller.js";
import express from "express";

const router = express.Router();

router.route("/register").post(signUp);
router.route("/login").post(login);
router.route("/logout").post(logout);

export default router;
