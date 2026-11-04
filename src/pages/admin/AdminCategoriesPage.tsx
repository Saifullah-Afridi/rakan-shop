import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Message } from "../../components/Message";
import {
  useAdminCategories,
  useAdminProducts,
  useDeleteCategory,
  useSaveCategory,
} from "../../hooks/useAdmin";
import type { Category } from "../../types";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { PageHeader } from "../../components/admin/PageHeader";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { CategoryForm } from "../../components/admin/CategoryForm";
import { Modal } from "../../components/admin/Modal";

export function AdminCategoriesPage() {
  const { data: categories = [], isLoading } = useAdminCategories();
  const { data: products = [] } = useAdminProducts();
  const save = useSaveCategory();
  const remove = useDeleteCategory();

  const [editing, setEditing] = useState<Category | "new" | null>(null);
  const [deleting, setDeleting] = useState<Category | null>(null);

  const openForm = (value: Category | "new") => {
    save.reset();
    setEditing(value);
  };

  const openDelete = (value: Category) => {
    remove.reset();
    setDeleting(value);
  };

  return (
    <>
      <PageHeader
        title="Categories"
        text="Create, update, and manage product categories."
        action={
          <button
            onClick={() => openForm("new")}
            className="flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-light"
          >
            <Plus size={16} />
            Add category
          </button>
        }
      />

      {isLoading && <div className="h-64 animate-pulse rounded-2xl bg-white" />}

      {!isLoading && categories.length === 0 && (
        <Message
          title="No categories yet"
          text="Add your first category to start adding products."
        />
      )}

      {categories.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-card text-xs text-muted">
              <tr>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">Icon</th>
                <th className="px-4 py-3">Products</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-line">
              {categories.map((category) => {
                const Icon = CATEGORY_ICONS[category.icon];

                const productCount = products.filter(
                  (product) => product.categoryId === category.id,
                ).length;

                return (
                  <tr key={category.id}>
                    <td className="px-4 py-3 font-semibold">{category.name}</td>

                    <td className="px-4 py-3">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={`${category.name} category`}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <span className="text-xs text-muted">No image</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-card text-brand">
                        <Icon size={20} />
                      </div>
                    </td>

                    <td className="px-4 py-3">{productCount}</td>

                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => openForm(category)}
                          aria-label={`Edit ${category.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-card"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => openDelete(category)}
                          aria-label={`Delete ${category.name}`}
                          className="grid h-9 w-9 place-items-center rounded-lg text-sale hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal
          title={editing === "new" ? "Add category" : "Edit category"}
          onClose={() => setEditing(null)}
        >
          <CategoryForm
            initial={editing === "new" ? undefined : editing}
            saving={save.isPending}
            error={save.error?.message}
            onCancel={() => setEditing(null)}
            onSubmit={(input) =>
              save.mutate(
                {
                  id: editing === "new" ? undefined : editing.id,
                  input,
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
          title="Delete category"
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
