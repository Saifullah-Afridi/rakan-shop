import type { Product, Unit } from "../types";
import { RAW } from "./rawProducts";
// Mock database. Rating and reviews are placeholders until real reviews exist.
export const PRODUCTS: Product[] = RAW.split("\n").map((line, i) => {
  const [categoryId, name, farm, price, unit, discount, tag] = line.split("|");
  const p = Number(price),
    d = Number(discount);
  return {
    id: i + 1,
    categoryId,
    name,
    farm,
    price: p,
    unit: unit as Unit,
    image: "",
  };
});
