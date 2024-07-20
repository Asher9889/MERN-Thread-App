import express from "express";
import { userController } from "../../controllers/index.js";

const router = express.Router();

router.post("/signup", userController.signupController)
// router.get("/login", userController.loginController)

export default router;