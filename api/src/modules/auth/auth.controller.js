import { asyncHandler } from "../../lib/asyncHandler.js";
import { loginAdmin } from "./auth.service.js";
import { loginSchema } from "./auth.validation.js";

export const login = asyncHandler(async (req, res) => {
  const input = loginSchema.parse(req.body);
  res.json(loginAdmin(input));
});
