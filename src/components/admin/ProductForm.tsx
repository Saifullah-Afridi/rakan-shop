import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, Product, Unit } from "../../types";
import type { ProductInput } from "../../types/admin";
import { FormButtons, FormField, inputClass } from "./FormField";

const UNITS: Unit[] = ["kg", "bunch", "head", "bottle", "pack"];

interface Props {
  initial?: Product;
  categories: Category[];
  saving: boolean;
  error?: string;
  onSubmit: (input: ProductInput) => void;
  onCancel: () => void;
}

export function ProductForm({ initial, categories, saving, error, onSubmit, onCancel }: Props) {
  const [f, setF] = useState({
    name: initial?.name ?? "",
    categoryId: initial?.categoryId ?? categories[0]?.id ?? "",
    farm: initial?.farm ?? "",
    unit: initial?.unit ?? ("kg" as Unit),
    price: initial ? String(initial.price) : "",
    discount: initial ? String(initial.discount) : "0",
    tag: initial?.tag ?? "",
    image: initial?.image ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (key: keyof typeof f) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setF({ ...f, [key]: e.target.value });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const price = Number(f.price);
    const discount = Number(f.discount || 0);
    const found: Record<string, string> = {};
    if (!f.name.trim()) found.name = "Enter a product name";
    if (!f.categoryId) found.categoryId = "Choose a category";
    if (!(price > 0)) found.price = "Price must be more than 0";
    if (discount < 0 || discount > 90) found.discount = "Use a number from 0 to 90";
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSubmit({
      name: f.name.trim(), categoryId: f.categoryId, farm: f.farm.trim(), unit: f.unit,
      price, discount, tag: f.tag.trim(), image: f.image.trim(),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-sale">{error}</p>}
      <FormField label="Product name" error={errors.name}>
        <input autoFocus value={f.name} onChange={set("name")} className={inputClass} placeholder="Fresh Jordan Valley Tomatoes" />
      </FormField>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Category" error={errors.categoryId}>
          <select value={f.categoryId} onChange={set("categoryId")} className={inputClass}>
            {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </FormField>
        <FormField label="Farm or source">
          <input value={f.farm} onChange={set("farm")} className={inputClass} placeholder="Northern Jordan Valley Farms" />
        </FormField>
        <FormField label="Sold by">
          <select value={f.unit} onChange={set("unit")} className={inputClass}>
            {UNITS.map((u) => <option key={u} value={u}>per {u}</option>)}
          </select>
        </FormField>
        <FormField label="Price (JOD)" error={errors.price}>
          <input type="number" step="0.01" min="0" value={f.price} onChange={set("price")} className={inputClass} />
        </FormField>
        <FormField label="Discount % (0 = none)" error={errors.discount}>
          <input type="number" min="0" max="90" value={f.discount} onChange={set("discount")} className={inputClass} />
        </FormField>
        <FormField label="Badge text (optional)">
          <input value={f.tag} onChange={set("tag")} className={inputClass} placeholder="Grade A" />
        </FormField>
      </div>
      <FormField label="Photo path or link (optional)">
        <input value={f.image} onChange={set("image")} className={inputClass} placeholder="/products/tomatoes.png" />
      </FormField>
      <FormButtons saving={saving} onCancel={onCancel} />
    </form>
  );
}
