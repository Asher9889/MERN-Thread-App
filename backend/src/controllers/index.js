import { loginController, signupController, logoutController, followAndUnFollowUserController } from "./user.controller.js"

export const userController = {
    signupController: signupController,
    loginController : loginController,
    logoutController: logoutController,
    followAndUnFollowUserController: followAndUnFollowUserController,
}