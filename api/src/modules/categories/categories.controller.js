import { asyncHandler } from "../../lib/asyncHandler.js";
import { createCategory, deleteCategory, getCategory, listCategories, updateCategory } from "./categories.service.js";
import { createCategorySchema, updateCategorySchema } from "./categories.validation.js";

export const list = asyncHandler(async (_req, res) => {
  res.json(await listCategories());
});

export const getOne = asyncHandler(async (req, res) => {
  res.json(await getCategory(req.params.id));
});

export const create = asyncHandler(async (req, res) => {
  const data = createCategorySchema.parse(req.body);
  res.status(201).json(await createCategory(data, req.file));
});

export const update = asyncHandler(async (req, res) => {
  const data = updateCategorySchema.parse(req.body);
  res.json(await updateCategory(req.params.id, data, req.file));
});

export const remove = asyncHandler(async (req, res) => {
  await deleteCategory(req.params.id);
  res.status(204).end();
});
