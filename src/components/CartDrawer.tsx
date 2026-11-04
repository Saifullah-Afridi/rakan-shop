import { X } from "lucide-react";
import { FREE_DELIVERY_OVER } from "../config";
import { useCart } from "../context/CartContext";
import { amountLabel, formatPrice } from "../utils/format";
import { QuantityStepper } from "./QuantityStepper";

export function CartDrawer() {
  const { items, subtotal, setAmount, isOpen, close } = useCart();
  const left = Math.max(0, FREE_DELIVERY_OVER - subtotal);
  return (
    <>
      <div
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-xl transition-transform ${isOpen ? "" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-xl font-bold">Your cart</h2>
          <button onClick={close} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>
        <div className="bg-green-50 px-5 py-3 text-sm">
          {left > 0
            ? `Add ${formatPrice(left)} JOD more for free delivery`
            : "You have free delivery"}
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-green-100">
            <div
              className="h-full bg-brand-light transition-all"
              style={{
                width: `${Math.min(100, (subtotal / FREE_DELIVERY_OVER) * 100)}%`,
              }}
            />
          </div>
        </div>
        <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
          {items.length === 0 && (
            <li className="py-12 text-center text-sm text-muted">
              Your cart is empty. Add something fresh from the store.
            </li>
          )}
          {items.map((item) => (
            <li
              key={item.productId}
              className="flex items-center justify-between gap-3 py-4"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-muted">
                  {amountLabel(item.amount, item.unit)} at{" "}
                  {formatPrice(item.price)} JOD
                </p>
                <p className="mt-1 text-sm font-bold">
                  {formatPrice(item.price * item.amount)} JOD
                </p>
              </div>
              <QuantityStepper
                value={item.amount}
                unit={item.unit}
                onChange={(v) => setAmount(item.productId, v)}
              />
            </li>
          ))}
        </ul>
        <div className="border-t border-line p-5">
          <p className="mb-3 flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)} JOD</span>
          </p>
          <button
            disabled
            className="w-full rounded-xl bg-brand py-3 font-semibold text-white opacity-40"
          >
            Checkout
          </button>
          <p className="mt-2 text-center text-xs text-muted">
            Checkout is the next step we build.
          </p>
        </div>
      </aside>
    </>
  );
}
