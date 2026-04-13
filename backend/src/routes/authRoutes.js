import { Router } from "express";
import { login, profile, signup } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", protect, profile);

export default router;
