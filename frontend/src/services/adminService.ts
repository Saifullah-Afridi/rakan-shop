import type { Category, Product } from "../types";
import type { CategoryInput, ProductInput } from "../types/admin";
import { api } from "./apiClient";

// Every function here is one API call. Images are sent as multipart form data.

function categoryForm(input: CategoryInput, imageFile?: File | null) {
  const form = new FormData();
  form.append("name", input.name);
  form.append("description", input.description ?? "");
  form.append("icon", input.icon);
  form.append("color", input.color);
  form.append("tint", input.tint);
  if (imageFile) form.append("image", imageFile);
  return form;
}

function productForm(input: ProductInput, imageFile?: File | null) {
  const form = new FormData();
  form.append("name", input.name);
  form.append("description", input.description);
  form.append("categoryId", input.categoryId);
  form.append("price", String(input.price));
  form.append("minQuantity", String(input.minQuantity));
  if (imageFile) form.append("image", imageFile);
  return form;
}

// ---------- categories ----------
export const getAdminCategories = () => api<Category[]>("/categories");

export const createCategory = (input: CategoryInput, imageFile?: File | null) =>
  api<Category>("/categories", { method: "POST", body: categoryForm(input, imageFile) });

export const updateCategory = (id: string, input: CategoryInput, imageFile?: File | null) =>
  api<Category>(`/categories/${encodeURIComponent(id)}`, { method: "PUT", body: categoryForm(input, imageFile) });

export const deleteCategory = (id: string) => api<void>(`/categories/${encodeURIComponent(id)}`, { method: "DELETE" });

// ---------- products ----------
export const getAdminProducts = () => api<Product[]>("/products");

export const createProduct = (input: ProductInput, imageFile?: File | null) =>
  api<Product>("/products", { method: "POST", body: productForm(input, imageFile) });

export const updateProduct = (id: number, input: ProductInput, imageFile?: File | null) =>
  api<Product>(`/products/${id}`, { method: "PUT", body: productForm(input, imageFile) });

export const deleteProduct = (id: number) => api<void>(`/products/${id}`, { method: "DELETE" });
