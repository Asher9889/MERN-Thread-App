import express from "express";
import userRoutes from "./user.route.js"
import postRoutes from "./post.route.js"

const router = express.Router();

router.use("/users", userRoutes)
router.use("/posts", postRoutes)

export default router;