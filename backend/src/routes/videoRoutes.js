import { Router } from "express";
import { generate, listTemplates, listVideos } from "../controllers/videoController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/templates", listTemplates);
router.get("/", protect, listVideos);
router.post("/generate", protect, generate);

export default router;
