import { loginController, signupController, logoutController, followAndUnFollowUserController, updateProfile, getUserProfile } from "./user.controller.js"
import { createPost, getPost, deletePost, likeAndUnlike} from "./post.controller.js"


export const userController = {
    signupController: signupController,
    loginController : loginController,
    logoutController: logoutController,
    followAndUnFollowUserController: followAndUnFollowUserController,
    updateProfile: updateProfile,
    getUserProfile: getUserProfile
}

export const postController = {
    createPost: createPost,
    getPost: getPost,
    deletePost: deletePost,
    likeAndUnlike: likeAndUnlike
}