import express from "express";
import v1Routes from "./v1/index.js"
import v2Routes from "./v2/index.js"

const router = express.Router();

// doing it for clean code and can segrigate version of Apis

router.use("/v1", v1Routes)
 
router.use("/v2", v2Routes)

export default router;