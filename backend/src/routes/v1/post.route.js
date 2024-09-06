import express from "express";
import { postController } from "../../controllers/index.js"
import { userMiddleware } from "../../middlewares/index.js"
const router = express.Router();

// protecting the route. whichout login Noone can create post
router.post("/create", userMiddleware.protectedRoute, postController.createPost)

export default router;