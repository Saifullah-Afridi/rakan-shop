import { Package, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { ConfirmDialog } from "../../components/admin/ConfirmDialog";
import { inputClass } from "../../components/admin/FormField";
import { Modal } from "../../components/admin/Modal";
import { PageHeader } from "../../components/admin/PageHeader";
import { ProductForm } from "../../components/admin/ProductForm";
import { Message } from "../../components/Message";
import { useAdminCategories, useAdminProducts, useDeleteProduct, useSaveProduct } from "../../hooks/useAdmin";
import type { Category, Product } from "../../types";
import { CATEGORY_ICONS } from "../../utils/categoryIcons";
import { formatPrice } from "../../utils/format";

function Thumb({ product, category }: { product: Product; category?: Category }) {
  if (product.image) return <img src={product.image} alt="" className="h-10 w-10 rounded-lg bg-card object-contain" />;
  const Icon = category ? CATEGORY_ICONS[category.icon] : Package;
  return <span className="grid h-10 w-10 place-items-center rounded-lg text-brand" style={{ background: category?.tint ?? "#eee" }}><Icon size={18} /></span>;
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
    return products.filter((p) => (!categoryId || p.categoryId === categoryId) && (!text || `${p.name} ${p.farm}`.toLowerCase().includes(text)));
  }, [products, search, categoryId]);
  const categoryOf = (id: string) => categories.find((c) => c.id === id);

  const openForm = (value: Product | "new") => { save.reset(); setEditing(value); };
  const openDelete = (value: Product) => { remove.reset(); setDeleting(value); };

  return (
    <>
      <PageHeader
        title="Products"
        text="Add, edit and remove what the store sells."
        action={
          <button
            onClick={() => openForm("new")}
            disabled={categories.length === 0}
            title={categories.length === 0 ? "Create a category first" : undefined}
            className="flex h-10 items-center gap-2 rounded-lg bg-brand px-4 text-sm font-semibold text-white hover:bg-brand-light disabled:opacity-50"
          >
            <Plus size={16} /> Add product
          </button>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        <label className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <Search size={16} className="pointer-events-none absolute left-3 top-3 text-muted" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or farm" className={`${inputClass} pl-9`} />
        </label>
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className={`${inputClass} w-auto`} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <span className="self-center text-sm text-muted">{list.length} products</span>
      </div>

      {isLoading && <div className="h-64 animate-pulse rounded-2xl bg-white" />}
      {!isLoading && list.length === 0 && <Message title="No products found" text="Change the search or filter, or add a new product." />}
      {list.length > 0 && (
        <div className="overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-card text-xs text-muted">
              <tr><th className="px-4 py-3">Product</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Offer</th><th className="px-4 py-3 text-right">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {list.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Thumb product={p} category={categoryOf(p.categoryId)} />
                      <div className="min-w-0"><p className="font-semibold">{p.name}</p><p className="text-xs text-muted">{p.farm || "No farm set"}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{categoryOf(p.categoryId)?.name ?? "Unknown"}</td>
                  <td className="px-4 py-3 font-semibold">
                    {formatPrice(p.price)} <span className="text-xs font-normal text-muted">JOD / {p.unit}</span>
                    {p.oldPrice && <s className="ml-2 text-xs font-normal text-muted">{formatPrice(p.oldPrice)}</s>}
                  </td>
                  <td className="px-4 py-3">{p.discount > 0 ? <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-semibold text-sale">{p.discount}% off</span> : <span className="text-muted">None</span>}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openForm(p)} aria-label={`Edit ${p.name}`} className="grid h-9 w-9 place-items-center rounded-lg hover:bg-card"><Pencil size={16} /></button>
                      <button onClick={() => openDelete(p)} aria-label={`Delete ${p.name}`} className="grid h-9 w-9 place-items-center rounded-lg text-sale hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal title={editing === "new" ? "Add product" : "Edit product"} onClose={() => setEditing(null)}>
          <ProductForm
            initial={editing === "new" ? undefined : editing}
            categories={categories}
            saving={save.isPending}
            error={save.error?.message}
            onCancel={() => setEditing(null)}
            onSubmit={(input) => save.mutate({ id: editing === "new" ? undefined : editing.id, input }, { onSuccess: () => setEditing(null) })}
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
          onConfirm={() => remove.mutate(deleting.id, { onSuccess: () => setDeleting(null) })}
        />
      )}
    </>
  );
}
