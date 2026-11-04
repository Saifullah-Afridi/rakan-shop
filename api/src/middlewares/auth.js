import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { httpError } from "../lib/httpError.js";

// Put in front of any route that only the admin may use.
export function requireAdmin(req, _res, next) {
  const header = req.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next(httpError(401, "Please sign in."));
  try {
    req.admin = jwt.verify(token, env.jwtSecret);
    next();
  } catch {
    next(httpError(401, "Your session has expired. Please sign in again."));
  }
}
