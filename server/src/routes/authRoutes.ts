import express from "express";
import passport from "passport";
import { login, register } from "../controllers/authControllers";
import { generateToken } from "../utils/jwt";
import { Request, Response } from "express";

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
    const token = generateToken({ id, email });
    res.redirect(`${process.env.CLIENT_URL}/login/success?token=${token}`);
  }
);


export default router;
