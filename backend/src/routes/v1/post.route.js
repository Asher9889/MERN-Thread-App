import express from "express";
import { postController } from "../../controllers/index.js"
import { userMiddleware } from "../../middlewares/index.js"
const router = express.Router();

// for feed display
router.get("/feed", userMiddleware.protectedRoute, postController.getFeedPosts)
// protecting the route. whichout login Noone can create post
router.post("/create", userMiddleware.protectedRoute, postController.createPost)
// getting single post with post id
router.get("/:id", userMiddleware.protectedRoute, postController.getPost)
// delete post
router.delete("/:id", userMiddleware.protectedRoute, postController.deletePost)
// for like and unlike
router.put("/like/:id", userMiddleware.protectedRoute, postController.likeAndUnlike)
// comment to post
router.post("/reply/:id", userMiddleware.protectedRoute, postController.commentToPost)


export default router;