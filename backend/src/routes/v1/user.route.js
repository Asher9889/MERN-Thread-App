import express from "express";
import { userController } from "../../controllers/index.js";
import { userMiddleware } from '../../middlewares/index.js';

const router = express.Router();

router.post("/signup", userController.signupController)
router.post("/login", userController.loginController)
router.get("/logout", userController.logoutController)
router.post("/followUnFollow/:id",userMiddleware.protectedRoute , userController.followAndUnFollowUserController)

export default router;