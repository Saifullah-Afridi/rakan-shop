import { useQuery } from '@tanstack/react-query'
import { getProduct, getProducts } from '../services/productService'
import type { ProductQuery } from '../types'

export const useProducts = (query: ProductQuery) => useQuery({ queryKey: ['products', query], queryFn: () => getProducts(query) })
export const useProduct = (id: number) => useQuery({ queryKey: ['product', id], queryFn: () => getProduct(id), enabled: !Number.isNaN(id) })
