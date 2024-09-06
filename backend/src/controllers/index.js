import { loginController, signupController, logoutController, followAndUnFollowUserController, updateProfile, getUserProfile } from "./user.controller.js"

export const userController = {
    signupController: signupController,
    loginController : loginController,
    logoutController: logoutController,
    followAndUnFollowUserController: followAndUnFollowUserController,
    updateProfile: updateProfile,
    getUserProfile: getUserProfile
}