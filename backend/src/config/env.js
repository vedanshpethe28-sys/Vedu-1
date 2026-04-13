import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || 5000,
  mongoUri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/promptshorts_ai",
  jwtSecret: process.env.JWT_SECRET || "super-secret-change-me",
  jwtExpire: process.env.JWT_EXPIRE || "7d",
  aiProvider: process.env.AI_PROVIDER || "replicate",
  replicateApiToken: process.env.REPLICATE_API_TOKEN || "",
  runwayApiToken: process.env.RUNWAY_API_TOKEN || "",
  stableVideoApiToken: process.env.STABLE_VIDEO_API_TOKEN || "",
  elevenLabsApiKey: process.env.ELEVENLABS_API_KEY || "",
  googleTtsApiKey: process.env.GOOGLE_TTS_API_KEY || "",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID || "",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET || "",
  appBaseUrl: process.env.APP_BASE_URL || "http://localhost:5173"
};
