import User from "../models/User.js";
import {
  createSubscriptionOrder,
  MONTHLY_PRICE_INR,
  verifyPaymentSignature
} from "../services/paymentService.js";

export const createOrder = async (req, res) => {
  const payload = await createSubscriptionOrder(req.user._id.toString());
  return res.status(201).json({
    plan: "paid",
    monthlyPriceInr: MONTHLY_PRICE_INR,
    ...payload
  });
};

export const verifyOrder = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  const isValid = verifyPaymentSignature({ orderId, paymentId, signature });
  if (!isValid) {
    return res.status(400).json({ message: "Payment verification failed." });
  }

  const user = await User.findById(req.user._id);
  user.plan = "paid";
  await user.save();

  return res.json({ message: "Subscription activated", plan: user.plan });
};
