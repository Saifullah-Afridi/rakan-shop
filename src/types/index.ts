// These shapes will match the MongoDB models when we build the API.
export type Unit = "kg" | "bunch" | "head" | "bottle" | "pack";
export type IconKey =
  | "Carrot"
  | "Apple"
  | "Beef"
  | "Milk"
  | "CupSoda"
  | "Wheat";
export type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

// export interface Category {
//   id: string;
//   name: string;
//   description: string;
//   icon: IconKey;
//   tint: string;
//   image?: string;
// }

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: IconKey;
  tint: string;
  color: string;
  image?: string;
}
export interface Product {
  id: number;
  categoryId: string;
  name: string;
  farm: string;
  price: number;
  oldPrice: number | null;
  discount: number;
  unit: Unit;
  tag: string;
  rating: number;
  reviews: number;
  image: string; // empty for now. Put an image URL here to show a real photo.
}
export interface CartItem {
  productId: number;
  name: string;
  price: number;
  unit: Unit;
  amount: number;
  image: string;
}
export interface ProductQuery {
  category?: string;
  q?: string;
  sort?: SortKey;
  offersOnly?: boolean;
  price?: "lt1" | "1to5" | "gt5";
  minRating?: number;
}
