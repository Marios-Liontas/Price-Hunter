import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/verifyJWT.js";

const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const user = new User({ email, password, username });
    await user.save();

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    // Set token in cookie
    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000, // 1 day
    });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("auth_token", token, {
      httpOnly: true,
      maxAge: 86400000,
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Validate Token Route
router.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).json({ userId: req.userId });
});

// Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
