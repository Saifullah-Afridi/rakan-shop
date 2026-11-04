import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { formatPrice, amountLabel } from "../utils/format";
import { ProductImage } from "./ProductImage";
import type { Product } from "../types";

const WEIGHT_OPTIONS = [0.25, 0.5, 0.75, 1];

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const [selectedWeight, setSelectedWeight] = useState(0.25);

  const isWeightBased = product.unit === "kg";

  // Calculate the price according to the selected weight.
  const displayPrice = isWeightBased
    ? product.price * selectedWeight
    : product.price;

  // Increase or decrease weight in 250g increments.
  const changeWeight = (amount: number) => {
    setSelectedWeight((weight) =>
      Math.max(0.25, Math.round((weight + amount) * 100) / 100),
    );
  };

  const handleAddToCart = () => {
    addItem(product, isWeightBased ? selectedWeight : 1);
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all duration-200 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg">
      {/* Product Image */}
      <Link
        to={`/product/${product.id}`}
        className="relative grid h-44 place-items-center bg-neutral-50 sm:h-48"
      >
        <ProductImage product={product} />
      </Link>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-4">
        {/* Product Name */}
        <Link
          to={`/product/${product.id}`}
          className="text-base font-semibold leading-snug text-brand"
        >
          {product.name}
        </Link>

        {/* Supplier */}
        <p className="mt-1 text-xs text-muted">{product.farm}</p>

        {/* Weight Selection */}
        {isWeightBased && (
          <div className="mt-3">
            <p className="mb-2 text-xs font-medium text-neutral-700">
              Choose weight
            </p>

            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
              {WEIGHT_OPTIONS.map((weight) => (
                <button
                  key={weight}
                  type="button"
                  onClick={() => setSelectedWeight(weight)}
                  className={`rounded-lg border py-1.5 text-xs font-medium transition ${
                    selectedWeight === weight
                      ? "border-brand bg-brand text-white"
                      : "border-line bg-white text-neutral-700 hover:border-brand hover:cursor-pointer"
                  }`}
                >
                  {amountLabel(weight, "kg")}
                </button>
              ))}
            </div>

            {/* Custom Weight */}
            <div className="mt-3">
              <p className="mb-2 text-xs font-medium text-neutral-700">
                Custom weight
              </p>

              <div className="flex items-center justify-between gap-2 rounded-lg border border-line bg-white px-2 py-1.5">
                <button
                  type="button"
                  aria-label="Decrease weight"
                  disabled={selectedWeight <= 0.25}
                  onClick={() => changeWeight(-0.25)}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line text-neutral-700 transition hover:border-brand disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Minus size={14} />
                </button>

                <input
                  type="text"
                  readOnly
                  value={amountLabel(selectedWeight, "kg")}
                  aria-label="Selected weight in kilograms"
                  className="min-w-0 w-full bg-transparent text-center text-sm font-semibold text-neutral-900 outline-none"
                />

                <button
                  type="button"
                  aria-label="Increase weight"
                  onClick={() => changeWeight(0.25)}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-line text-neutral-700 transition hover:border-brand"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-line pt-3 mt-4">
          <div>
            <p className="text-base font-bold text-neutral-900">
              {formatPrice(displayPrice)} JOD
            </p>

            {isWeightBased && (
              <p className="mt-0.5 text-xs text-muted">
                {amountLabel(selectedWeight, "kg")}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1 rounded-lg bg-brand px-2.5 py-2 text-xs font-semibold text-white transition hover:bg-brand-light sm:px-3"
          >
            <Plus size={15} />
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
