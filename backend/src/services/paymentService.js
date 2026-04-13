import Razorpay from "razorpay";
import crypto from "crypto";
import { env } from "../config/env.js";

const MONTHLY_PRICE_INR = 299;

const razorpayClient = env.razorpayKeyId && env.razorpayKeySecret
  ? new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret })
  : null;

export const createSubscriptionOrder = async (userId) => {
  if (!razorpayClient) {
    return {
      mode: "mock",
      order: {
        id: `order_mock_${userId}`,
        amount: MONTHLY_PRICE_INR * 100,
        currency: "INR"
      }
    };
  }

  const order = await razorpayClient.orders.create({
    amount: MONTHLY_PRICE_INR * 100,
    currency: "INR",
    receipt: `receipt_${userId}_${Date.now()}`
  });

  return { mode: "live", order };
};

export const verifyPaymentSignature = ({ orderId, paymentId, signature }) => {
  if (!env.razorpayKeySecret) {
    return true;
  }

  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", env.razorpayKeySecret)
    .update(body)
    .digest("hex");

  return expectedSignature === signature;
};

export { MONTHLY_PRICE_INR };
