import type { Category } from "../types";

// color = card background on the Home page
// image = optional photo, e.g. "/categories/veg.png" (file goes in public/categories/)
export const CATEGORIES: Category[] = [
  {
    id: "veg",
    name: "Vegetables",
    description: "Daily harvest from Houran plains and Jordan Valley",
    icon: "Carrot",
    tint: "#d9ecd9",
    color: "#6f7d1f",
    image: "",
  },
  {
    id: "fruit",
    name: "Fruits",
    description: "Seasonal orchard fruit from Ajloun and Irbid groves",
    icon: "Apple",
    tint: "#f6dfd3",
    color: "#157a66",
    image: "",
  },
  {
    id: "meat",
    name: "Meats",
    description: "Baladi Naemi lamb, fresh veal, and farm-chilled poultry",
    icon: "Beef",
    tint: "#f2d6da",
    color: "#7f1717",
    image: "",
  },
  {
    id: "dairy",
    name: "Dairy & Cheeses",
    description: "Nabulsi cheese, Jerash labneh, Karak jameed, fresh milk",
    icon: "Milk",
    tint: "#d8e6f2",
    color: "#6b1f6e",
    image: "",
  },
  {
    id: "juice",
    name: "Fresh Juices",
    description: "100% cold-pressed daily, zero added sugar",
    icon: "CupSoda",
    tint: "#f7e6c4",
    color: "#10337a",
    image: "",
  },
  {
    id: "super",
    name: "Supermarket",
    description: "Kafarat olive oil, aged basmati rice, grains, pantry",
    icon: "Wheat",
    tint: "#e6e2cf",
    color: "#6b3d10",
    image: "",
  },
];
