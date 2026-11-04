import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { CartItem, Product } from "../types";

interface CartValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, amount?: number) => void;
  setAmount: (productId: number, amount: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const CartContext = createContext<CartValue | null>(null);
const KEY = "rakan-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, amount = 1) => {
    setItems((list) => {
      const existingItem = list.find((item) => item.productId === product.id);

      if (existingItem) {
        return list.map((item) =>
          item.productId === product.id
            ? { ...item, amount: item.amount + amount }
            : item,
        );
      }

      return [
        ...list,
        {
          productId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          unit: product.unit,
          amount,
          image: product.image,
        },
      ];
    });

    // Do not open the drawer when a product is added.
  };

  const setAmount = (productId: number, amount: number) => {
    setItems((list) =>
      amount <= 0
        ? list.filter((item) => item.productId !== productId)
        : list.map((item) =>
            item.productId === productId ? { ...item, amount } : item,
          ),
    );
  };

  const removeItem = (productId: number) => {
    setItems((list) => list.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((sum, item) => {
    const lineTotal =
      item.unit === "kg"
        ? item.price * (item.amount / 0.25)
        : item.price * item.amount;

    return sum + lineTotal;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        count: items.length,
        subtotal,
        addItem,
        setAmount,
        removeItem,
        clearCart,
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
