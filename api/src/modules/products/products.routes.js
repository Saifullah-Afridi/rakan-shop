import { Router } from "express";
import { requireAdmin } from "../../middlewares/auth.js";
import { parseImage } from "../../middlewares/parseImage.js";
import { create, getOne, list, remove, update } from "./products.controller.js";

const router = Router();

// Anyone can read. Only the admin can change.
router.get("/", list);
router.get("/:id", getOne);
router.post("/", requireAdmin, parseImage, create);
router.put("/:id", requireAdmin, parseImage, update);
router.delete("/:id", requireAdmin, remove);

export default router;
