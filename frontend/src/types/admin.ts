import type { Category, Product } from "./index";

// What the admin forms send. The API stores these fields in the Prisma models.
export type CategoryInput = Omit<Category, "id">;
export type ProductInput = Pick<Product, "name" | "description" | "categoryId" | "price" | "minQuantity" | "image">;
