import multer from "multer";
import { ZodError } from "zod";
import { httpError } from "../lib/httpError.js";

export const notFound = (_req, _res, next) => next(httpError(404, "Route not found."));

// Every error ends up here and leaves as { message }.
export function errorHandler(err, _req, res, _next) {
  if (err instanceof ZodError) {
    const issue = err.issues[0];
    const field = issue.path.join(".");
    return res.status(400).json({ message: field ? `${field}: ${issue.message}` : issue.message });
  }
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.code === "LIMIT_FILE_SIZE" ? "The image must be 5 MB or smaller." : err.message });
  }
  if (err.code === "P2002") return res.status(409).json({ message: "That value already exists." });
  if (err.code === "P2025") return res.status(404).json({ message: "Item not found." });
  if (err.code === "P2003") return res.status(409).json({ message: "That item is still in use or does not exist." });

  const status = err.status ?? 500;
  if (status === 500) console.error(err);
  res.status(status).json({ message: status === 500 ? "Something went wrong on the server." : err.message });
}
