import express, { Request, Response } from "express";
import passport from "passport";
import { login, register } from "../controllers/authControllers";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import jwt from "jsonwebtoken";

const router = express.Router();

// Email routes
router.post("/register", register);
router.post("/login", login);

// Google OAuth
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  (req: Request, res: Response) => {
    if (!req.user || typeof req.user !== "object") {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const { id, email } = req.user as { id: string; email: string };

    const accessToken = generateAccessToken({ id, email });
    const refreshToken = generateRefreshToken({ id, email });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    res.redirect(`${process.env.CLIENT_URL}/auth?token=${accessToken}`);
  }
);

// Refresh route
router.post("/refresh", (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401).json({ message: "No refresh token" });
    return;
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as { id: string; email: string };
    const accessToken = generateAccessToken({ id: payload.id, email: payload.email });

    res.json({ accessToken });
    return;
  } catch (err) {
    res.status(403).json({ message: "Invalid refresh token" });
    return;
  }
});

// Logout route
router.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/", 
  });
  res.json({ message: "Logged out" });
});

export default router;