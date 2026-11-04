import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import { amountLabel, formatPrice } from "../utils/format";

export function CartDrawer() {
  const { items, subtotal, setAmount, removeItem, clearCart, isOpen, close } =
    useCart();

  const getLineTotal = (item: (typeof items)[number]) =>
    item.unit === "kg"
      ? item.price * (item.amount / 0.25)
      : item.price * item.amount;

  const changeAmount = (
    item: (typeof items)[number],
    direction: "increase" | "decrease",
  ) => {
    const step = item.unit === "kg" ? 0.25 : 1;
    const nextAmount =
      direction === "increase"
        ? item.amount + step
        : Math.max(step, item.amount - step);

    setAmount(item.productId, Number(nextAmount.toFixed(2)));
  };

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close shopping cart"
        onClick={close}
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Cart drawer */}
      <aside
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="text-lg font-bold text-neutral-900">
            Shopping cart{" "}
            <span className="font-medium text-muted">
              ({items.length} items)
            </span>
          </h2>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 size={15} />
                Clear cart
              </button>
            )}

            <button
              type="button"
              onClick={close}
              aria-label="Close cart"
              className="grid h-9 w-9 place-items-center rounded-full text-neutral-500 transition hover:bg-card hover:text-neutral-900"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-card text-brand">
                <ShoppingBag size={28} />
              </span>

              <h3 className="mt-4 font-semibold text-neutral-900">
                Your cart is empty
              </h3>

              <p className="mt-1 max-w-xs text-sm text-muted">
                Your fresh picks will show up here when you add them.
              </p>

              <button
                type="button"
                onClick={close}
                className="mt-5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-light"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <ul>
              {items.map((item) => {
                const minimumAmount = item.unit === "kg" ? 0.25 : 1;
                const isAtMinimum = item.amount <= minimumAmount;

                return (
                  <li
                    key={item.productId}
                    className="grid grid-cols-[minmax(0,1fr)_112px_32px] items-start gap-3 border-b border-line py-5"
                  >
                    {/* Column 1: Item details */}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold leading-5 text-neutral-900">
                        {item.name}
                      </p>

                      <p className="mt-1.5 text-[11px] text-muted">
                        {formatPrice(item.price)} JOD per 0.25 kg
                      </p>

                      <p className="mt-1 text-xs font-bold text-neutral-900">
                        {formatPrice(getLineTotal(item))} JOD
                      </p>
                    </div>

                    {/* Column 2: Horizontal quantity controls */}
                    <div className="flex h-8 w-[112px] items-center overflow-hidden rounded-lg border border-line">
                      <button
                        type="button"
                        onClick={() => changeAmount(item, "decrease")}
                        disabled={isAtMinimum}
                        aria-label={`Decrease ${item.name} quantity`}
                        className="grid h-full w-8 shrink-0 place-items-center text-neutral-700 transition hover:bg-card disabled:cursor-not-allowed disabled:text-neutral-300"
                      >
                        <Minus size={13} />
                      </button>

                      <span className="flex h-full min-w-0 flex-1 items-center justify-center border-x border-line px-1 text-[11px] font-semibold text-neutral-900">
                        {amountLabel(item.amount, item.unit)}
                      </span>

                      <button
                        type="button"
                        onClick={() => changeAmount(item, "increase")}
                        aria-label={`Increase ${item.name} quantity`}
                        className="grid h-full w-8 shrink-0 place-items-center text-neutral-700 transition hover:bg-card"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    {/* Column 3: Delete */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.name} from cart`}
                      className="grid h-8 w-8 place-items-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={15} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Order summary */}
        {items.length > 0 && (
          <div className="border-t border-line bg-white p-6">
            <div className="mb-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)} JOD</span>
              </div>

              <div className="flex justify-between text-muted">
                <span>Delivery</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between border-t border-line pt-3 text-base font-bold text-neutral-900">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)} JOD</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-brand py-3.5 text-sm font-semibold text-white transition hover:bg-brand-light"
            >
              Continue order
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
