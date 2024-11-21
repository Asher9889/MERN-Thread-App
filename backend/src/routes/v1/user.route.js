import express from "express";
import { userController } from "../../controllers/index.js";
import { userMiddleware } from '../../middlewares/index.js';

const router = express.Router();


router.post("/signup", userController.signupController);
router.post("/login", userController.loginController);
router.get("/logout", userController.logoutController);
router.post("/follow/:id",userMiddleware.protectedRoute , userController.followAndUnFollowUserController);
// i write functionality like toggling. It do both If followed then unfollow. vise versa
router.put("/update/:id", userMiddleware.protectedRoute, userController.updateProfile);
// no need to protect the route
router.get("/profile/:username",userController.getUserProfile)


export default router;