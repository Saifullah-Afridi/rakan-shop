import type { Unit } from "../types";
export const formatPrice = (n: number) => n.toFixed(2);
// kg items change in quarter-kilo steps, everything else by one
export const stepFor = (unit: Unit) => (unit === "kg" ? 0.25 : 1);
export const amountLabel = (amount: number, unit: Unit) =>
  unit === "kg" ? `${amount.toFixed(2)} kg` : `${amount} ${unit}`;
