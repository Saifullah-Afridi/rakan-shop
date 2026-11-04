import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { CartItem, Product } from '../types'

interface CartValue {
  items: CartItem[]; count: number; subtotal: number
  addItem: (p: Product, amount?: number) => void
  setAmount: (productId: number, amount: number) => void
  isOpen: boolean; open: () => void; close: () => void
}
const CartContext = createContext<CartValue | null>(null)
const KEY = 'rakan-cart'

export function CartProvider({ children }: { children: ReactNode }) {
  // The cart is saved in the browser so it survives a refresh.
  const [items, setItems] = useState<CartItem[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') } catch { return [] }
  })
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(items)), [items])

  const addItem = (p: Product, amount = 1) => {
    setItems(list => list.some(i => i.productId === p.id)
      ? list.map(i => (i.productId === p.id ? { ...i, amount: i.amount + amount } : i))
      : [...list, { productId: p.id, name: p.name, price: p.price, unit: p.unit, amount, image: p.image }])
    setIsOpen(true)
  }
  const setAmount = (productId: number, amount: number) =>
    setItems(list => (amount <= 0 ? list.filter(i => i.productId !== productId) : list.map(i => (i.productId === productId ? { ...i, amount } : i))))

  const subtotal = items.reduce((sum, i) => sum + i.price * i.amount, 0)
  return <CartContext.Provider value={{ items, count: items.length, subtotal, addItem, setAmount, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
