import { Package, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { inputClass } from "../../components/admin/FormField";
import { Modal } from "../../components/admin/Modal";
import { PageHeader } from "../../components/admin/PageHeader";
import { ProductForm } from "../../components/admin/ProductForm";
import { Message } from "../../components/Message";
import {
  useAdminCategories,
  useAdminProducts,
  useDeleteProduct,
  useSaveProduct,
} from "../../hooks/useAdmin";
import type { Category, Product } from "../../types";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { formatPrice } from "../../utils/format";

function ProductImage({
  product,
  category,
}: {
  product: Product;
  category?: Category;
}) {
  if (product.image) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className="h-12 w-12 rounded-lg bg-card object-cover"
      />
    );
  }

  const Icon = category ? CATEGORY_ICONS[category.icon] : Package;

  return (
    <span
      className="grid h-12 w-12 place-items-center rounded-lg text-brand"
      style={{ background: category?.tint ?? "#eee" }}
    >
      <Icon size={20} />
    </span>
  );
}

export function AdminProductsPage() {
  const { data: categories = [] } = useAdminCategories();
  const { data: products = [], isLoading } = useAdminProducts();

  const save = useSaveProduct();
  const remove = useDeleteProduct();

  const [editing, setEditing] = useState<Product | "new" | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const list = useMemo(() => {
    const text = search.trim().toLowerCase();

    return products.filter(
      (product) =>
        (!categoryId || product.categoryId === categoryId) &&
        (!text ||
          `${product.name} ${product.description}`
            .toLowerCase()
            .includes(text)),
    );
  }, [products, search, categoryId]);

  const categoryOf = (id: string) =>
    categories.find((category) => category.id === id);

  const openForm = (value: Product | "new") => {
    save.reset();
    setEditing(value);
  };

  const openDelete = (value: Product) => {
    remove.reset();
    setDeleting(value);
  };

  return (
    <>
      <PageHeader
        title="Products"
        text="Add, edit and remove what the store sells."
        action={
          <button
            onClick={() => openForm("new")}
            disabled={categories.length === 0}
            title={
              categories.length === 0 ? "Create a category first" : undefined
            }
            className="flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-light disabled:opacity-50"
          >
            <Plus size={16} />
            Add product
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <label className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-3 text-muted"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or description"
            className={`${inputClass} pl-9`}
          />
        </label>

        <select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          className={`${inputClass} w-auto`}
          aria-label="Filter by category"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <span className="self-center text-sm text-muted">
          {list.length} products
        </span>
      </div>

      {isLoading && <div className="h-64 animate-pulse rounded-2xl bg-white" />}

      {!isLoading && list.length === 0 && (
        <Message
          title="No products found"
          text="Change the search or filter, or add a new product."
        />
      )}

      {list.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-card text-xs text-muted">
              <tr>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Price / 0.25 kg</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {list.map((product) => (
                <tr key={product.id}>
                  <td className="px-4 py-3">
                    <ProductImage
                      product={product}
                      category={categoryOf(product.categoryId)}
                    />
                  </td>

                  <td className="px-4 py-3 font-semibold">{product.name}</td>

                  <td className="max-w-xs px-4 py-3 text-sm text-muted">
                    <p className="line-clamp-2">
                      {product.description || "No description"}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    {categoryOf(product.categoryId)?.name ?? "Unknown"}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3 font-semibold">
                    {formatPrice(product.price)} JOD
                    <span className="ml-1 text-xs font-normal text-muted">
                      / 0.25 kg
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openForm(product)}
                        aria-label={`Edit ${product.name}`}
                        className="grid h-9 w-9 place-items-center rounded-lg hover:bg-card"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => openDelete(product)}
                        aria-label={`Delete ${product.name}`}
                        className="grid h-9 w-9 place-items-center rounded-lg text-sale hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal
          title={editing === "new" ? "Add product" : "Edit product"}
          onClose={() => setEditing(null)}
        >
          <ProductForm
            initial={editing === "new" ? undefined : editing}
            categories={categories}
            saving={save.isPending}
            error={save.error?.message}
            onCancel={() => setEditing(null)}
            onSubmit={(input, imageFile) =>
              save.mutate(
                {
                  id: editing === "new" ? undefined : editing.id,
                  input,
                  imageFile,
                },
                {
                  onSuccess: () => setEditing(null),
                },
              )
            }
          />
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Delete product"
          text={`Delete "${deleting.name}"? This cannot be undone.`}
          confirmLabel="Delete"
          busy={remove.isPending}
          error={remove.error?.message}
          onCancel={() => setDeleting(null)}
          onConfirm={() =>
            remove.mutate(deleting.id, {
              onSuccess: () => setDeleting(null),
            })
          }
        />
      )}
    </>
  );
}
