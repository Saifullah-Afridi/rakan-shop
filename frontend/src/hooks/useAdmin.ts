import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createCategory, createProduct, deleteCategory, deleteProduct,
  getAdminCategories, getAdminProducts, updateCategory, updateProduct,
} from "../services/adminService";
import type { CategoryInput, ProductInput } from "../types/admin";

export const useAdminCategories = () => useQuery({ queryKey: ["admin", "categories"], queryFn: getAdminCategories });
export const useAdminProducts = () => useQuery({ queryKey: ["admin", "products"], queryFn: getAdminProducts });

// After any change: reload the admin lists and show a toast with the result.
function useChange<V>(run: (v: V) => Promise<unknown>, successMessage: (v: V) => string) {
  const client = useQueryClient();
  return useMutation<unknown, Error, V>({
    mutationFn: run,
    onSuccess: (_data, variables) => {
      client.invalidateQueries({ queryKey: ["admin"] });
      toast.success(successMessage(variables));
    },
    onError: (error) => toast.error(error.message),
  });
}

// id missing = create, id present = update
export const useSaveCategory = () =>
  useChange(
    ({ id, input, imageFile }: { id?: string; input: CategoryInput; imageFile?: File | null }) =>
      id ? updateCategory(id, input, imageFile) : createCategory(input, imageFile),
    ({ id }) => (id ? "Category updated" : "Category created"),
  );

export const useDeleteCategory = () => useChange((id: string) => deleteCategory(id), () => "Category deleted");

export const useSaveProduct = () =>
  useChange(
    ({ id, input, imageFile }: { id?: number; input: ProductInput; imageFile?: File | null }) =>
      id ? updateProduct(id, input, imageFile) : createProduct(input, imageFile),
    ({ id }) => (id ? "Product updated" : "Product created"),
  );

export const useDeleteProduct = () => useChange((id: number) => deleteProduct(id), () => "Product deleted");
