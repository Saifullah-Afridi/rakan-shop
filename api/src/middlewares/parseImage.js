import multer from "multer";
import { httpError } from "../lib/httpError.js";

// Reads one optional file sent in the "image" field. Kept in memory, then sent to Supabase.
export const parseImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) =>
    file.mimetype.startsWith("image/") ? cb(null, true) : cb(httpError(400, "Only image files are allowed.")),
}).single("image");
