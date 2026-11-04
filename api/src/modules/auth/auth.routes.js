import { Router } from "express";
import rateLimit from "express-rate-limit";
import { login } from "./auth.controller.js";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: "Too many attempts. Try again in a few minutes." },
});

const router = Router();
router.post("/login", loginLimiter, login);

export default router;
