import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { env } from "../config/env.js";
import { creditsRemaining, resetDailyCreditsIfNeeded } from "../utils/creditUtils.js";

const generateToken = (id) =>
  jwt.sign({ id }, env.jwtSecret, {
    expiresIn: env.jwtExpire
  });

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already in use." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  return res.status(201).json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      creditsRemaining: creditsRemaining(user)
    }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  resetDailyCreditsIfNeeded(user);
  await user.save();

  return res.json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      plan: user.plan,
      creditsRemaining: creditsRemaining(user)
    }
  });
};

export const profile = async (req, res) => {
  const user = await User.findById(req.user._id);
  resetDailyCreditsIfNeeded(user);
  await user.save();

  return res.json({
    id: user._id,
    name: user.name,
    email: user.email,
    plan: user.plan,
    creditsUsedToday: user.creditsUsedToday,
    creditsRemaining: creditsRemaining(user)
  });
};
