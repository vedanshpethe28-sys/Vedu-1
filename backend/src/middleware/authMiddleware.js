import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { env } from "../config/env.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return res.status(401).json({ message: "Not authorized. Token missing." });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token." });
  }
};
