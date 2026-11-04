import { asyncHandler } from "../../lib/asyncHandler.js";
import { httpError } from "../../lib/httpError.js";
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from "./products.service.js";
import { createProductSchema, listQuerySchema, updateProductSchema } from "./products.validation.js";

function readId(req) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1) throw httpError(400, "Invalid product id.");
  return id;
}

export const list = asyncHandler(async (req, res) => {
  res.json(await listProducts(listQuerySchema.parse(req.query)));
});

export const getOne = asyncHandler(async (req, res) => {
  res.json(await getProduct(readId(req)));
});

export const create = asyncHandler(async (req, res) => {
  const data = createProductSchema.parse(req.body);
  res.status(201).json(await createProduct(data, req.file));
});

export const update = asyncHandler(async (req, res) => {
  const data = updateProductSchema.parse(req.body);
  res.json(await updateProduct(readId(req), data, req.file));
});

export const remove = asyncHandler(async (req, res) => {
  await deleteProduct(readId(req));
  res.status(204).end();
});
