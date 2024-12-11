import { signUp, login } from "../controller/user.controller.js";
import express from "expresss";

const router = express.Router();

router.route("/register").post(signUp);
router.route("/login").post(login);

export default router;
