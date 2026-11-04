import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCategory, createProduct, deleteCategory, deleteProduct,
  getAdminCategories, getAdminProducts, updateCategory, updateProduct,
} from "../services/adminService";
import type { CategoryInput, ProductInput } from "../types/admin";

export const useAdminCategories = () => useQuery({ queryKey: ["admin", "categories"], queryFn: getAdminCategories });
export const useAdminProducts = () => useQuery({ queryKey: ["admin", "products"], queryFn: getAdminProducts });

// After any change, reload every admin list so the screen shows the new data.
function useChange<V>(run: (v: V) => Promise<unknown>) {
  const client = useQueryClient();
  return useMutation<unknown, Error, V>({
    mutationFn: run,
    onSuccess: () => client.invalidateQueries({ queryKey: ["admin"] }),
  });
}

// id missing = create, id present = update
export const useSaveCategory = () =>
  useChange(({ id, input }: { id?: string; input: CategoryInput }) => (id ? updateCategory(id, input) : createCategory(input)));
export const useDeleteCategory = () => useChange((id: string) => deleteCategory(id));
export const useSaveProduct = () =>
  useChange(({ id, input }: { id?: number; input: ProductInput }) => (id ? updateProduct(id, input) : createProduct(input)));
export const useDeleteProduct = () => useChange((id: number) => deleteProduct(id));
