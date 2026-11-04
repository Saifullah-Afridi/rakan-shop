import {
  Apple,
  Beef,
  Carrot,
  CupSoda,
  Milk,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import type { IconKey } from "../types";

// The icons a category can use. To add one, add it here and to IconKey in src/types/index.ts.
export const CATEGORY_ICONS: Record<IconKey, LucideIcon> = {
  Carrot,
  Apple,
  Beef,
  Milk,
  CupSoda,
  Wheat,
};
export const ICON_KEYS = Object.keys(CATEGORY_ICONS) as IconKey[];
