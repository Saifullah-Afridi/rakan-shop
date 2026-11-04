import type { Category, Product } from "./index";

// What the admin forms send. These will match the Prisma models later.
export type CategoryInput = Omit<Category, "id">;
export type ProductInput = Omit<Product, "id" | "oldPrice" | "rating" | "reviews">;
