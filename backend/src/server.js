import express from "express";
import cors from "cors";
import { connectDb } from "./config/db.js";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

app.use(cors({ origin: env.appBaseUrl, credentials: true }));
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "PromptShorts AI" });
});

app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/payments", paymentRoutes);

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: "Server error", error: error.message });
});

connectDb().then(() => {
  app.listen(env.port, () => {
    console.log(`PromptShorts backend running on port ${env.port}`);
  });
});
