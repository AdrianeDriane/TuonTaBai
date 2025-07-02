import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.googleId && !existingUser.password) {
        res.status(400).json({ message: "This email is already registered with Google. Please sign in with Google." });
        return;
      }
      res.status(400).json({ message: "User already exists." });
      return;
    }

    const hashed = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashed }) as typeof User.prototype & { _id: any, password?: string, googleId?: string };
    await newUser.save();

    const accessToken = generateAccessToken({ id: newUser._id.toString(), email });
    const refreshToken = generateRefreshToken({ id: newUser._id.toString(), email });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/", // Important
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }) as (typeof User.prototype & { _id: any, password?: string, googleId?: string });

    if (!user) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    // Scenario 1: Email exists but was created via Google
    if (!user.password && user.googleId) {
      res.status(400).json({ message: "This email is registered with Google. Please sign in with Google." });
      return;
    }

    const match = await bcrypt.compare(password, user.password!);
    if (!match) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const accessToken = generateAccessToken({ id: user._id.toString(), email });
    const refreshToken = generateRefreshToken({ id: user._id.toString(), email });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
