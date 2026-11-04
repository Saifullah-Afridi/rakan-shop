import { PRODUCTS } from '../data/products'
import type { Product, ProductQuery } from '../types'

const wait = (ms = 250) => new Promise(r => setTimeout(r, ms)) // pretend to be a network call
const PRICE_RULES = { lt1: (p: number) => p < 1, '1to5': (p: number) => p >= 1 && p <= 5, gt5: (p: number) => p > 5 }

// LATER: replace the body with  fetch(`/api/products?${params}`).then(r => r.json())
export async function getProducts(query: ProductQuery = {}): Promise<Product[]> {
  await wait()
  const text = query.q?.trim().toLowerCase()
  const list = PRODUCTS.filter(p =>
    (!query.category || p.categoryId === query.category) &&
    (!query.offersOnly || p.discount > 0) &&
    (!query.minRating || p.rating >= query.minRating) &&
    (!query.price || PRICE_RULES[query.price](p.price)) &&
    (!text || `${p.name} ${p.farm}`.toLowerCase().includes(text)))
  if (query.sort === 'price-asc') list.sort((a, b) => a.price - b.price)
  if (query.sort === 'price-desc') list.sort((a, b) => b.price - a.price)
  if (query.sort === 'rating') list.sort((a, b) => b.rating - a.rating)
  return list
}

// LATER: fetch(`/api/products/${id}`)
export async function getProduct(id: number): Promise<Product | undefined> {
  await wait(150)
  return PRODUCTS.find(p => p.id === id)
}
