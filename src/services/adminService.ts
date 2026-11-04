import { CATEGORIES } from "../data/categories";
import { PRODUCTS } from "../data/products";
import type { Category, Product } from "../types";
import type { CategoryInput, ProductInput } from "../types/admin";

// Mock database saved in the browser. The first time, it is filled from src/data.
// LATER: every function below becomes a fetch("/api/admin/...") call. Nothing else changes.
const KEY = "rakan-admin-db";
interface Db {
  categories: Category[];
  products: Product[];
  nextProductId: number;
}

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

function load(): Db {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved) return JSON.parse(saved) as Db;
  } catch {
    /* start fresh */
  }
  return { categories: CATEGORIES, products: PRODUCTS, nextProductId: Math.max(...PRODUCTS.map((p) => p.id)) + 1 };
}
const save = (db: Db) => localStorage.setItem(KEY, JSON.stringify(db));
const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const oldPriceOf = (price: number, discount: number) => (discount > 0 ? price / (1 - discount / 100) : null);

// ---------- categories ----------
export async function getAdminCategories(): Promise<Category[]> {
  await wait();
  return load().categories;
}

export async function createCategory(input: CategoryInput): Promise<Category> {
  await wait();
  const db = load();
  const id = slugify(input.name) || `category-${Date.now()}`;
  if (db.categories.some((c) => c.id === id)) throw new Error("A category with this name already exists.");
  const category = { id, ...input };
  db.categories.push(category);
  save(db);
  return category;
}

export async function updateCategory(id: string, input: CategoryInput): Promise<Category> {
  await wait();
  const db = load();
  db.categories = db.categories.map((c) => (c.id === id ? { id, ...input } : c));
  save(db);
  return { id, ...input };
}

export async function deleteCategory(id: string): Promise<void> {
  await wait();
  const db = load();
  const used = db.products.filter((p) => p.categoryId === id).length;
  if (used > 0) throw new Error(`This category still has ${used} products. Move or delete them first.`);
  db.categories = db.categories.filter((c) => c.id !== id);
  save(db);
}

// ---------- products ----------
export async function getAdminProducts(): Promise<Product[]> {
  await wait();
  return load().products;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  await wait();
  const db = load();
  const product: Product = { id: db.nextProductId++, ...input, oldPrice: oldPriceOf(input.price, input.discount), rating: 0, reviews: 0 };
  db.products.push(product);
  save(db);
  return product;
}

export async function updateProduct(id: number, input: ProductInput): Promise<void> {
  await wait();
  const db = load();
  db.products = db.products.map((p) => (p.id === id ? { ...p, ...input, oldPrice: oldPriceOf(input.price, input.discount) } : p));
  save(db);
}

export async function deleteProduct(id: number): Promise<void> {
  await wait();
  const db = load();
  db.products = db.products.filter((p) => p.id !== id);
  save(db);
}
