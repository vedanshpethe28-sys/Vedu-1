import { Router } from "express";
import { createOrder, verifyOrder } from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyOrder);

export default router;
