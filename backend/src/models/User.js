import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    plan: { type: String, enum: ["free", "paid"], default: "free" },
    creditsUsedToday: { type: Number, default: 0 },
    creditsResetDate: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
