import { timingSafeEqual } from "node:crypto";
import jwt from "jsonwebtoken";
import { env } from "../../config/env.js";
import { httpError } from "../../lib/httpError.js";

const same = (a, b) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

// For now there is one admin, set in .env. LATER: look the admin up in the database with a hashed password.
export function loginAdmin({ email, password }) {
  const valid = same(email.toLowerCase(), env.adminEmail) && same(password, env.adminPassword);
  if (!valid) throw httpError(401, "Wrong email or password.");

  const user = { email: env.adminEmail, name: "Admin" };
  const token = jwt.sign(user, env.jwtSecret, { expiresIn: "7d" });
  return { token, user };
}
