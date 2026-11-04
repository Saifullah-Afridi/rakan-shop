import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type { Category, Product } from "../../types";
import type { ProductInput } from "../../types/admin";
import { FormButtons, FormField, inputClass } from "./FormField";

interface Props {
  initial?: Product;
  categories: Category[];
  saving: boolean;
  error?: string;
  onSubmit: (input: ProductInput, imageFile: File | null) => void;
  onCancel: () => void;
}

export function ProductForm({
  initial,
  categories,
  saving,
  error,
  onSubmit,
  onCancel,
}: Props) {
  const [f, setF] = useState({
    name: initial?.name ?? "",
    description: initial?.description ?? "",
    categoryId: initial?.categoryId ?? categories[0]?.id ?? "",
    price: initial ? String(initial.price) : "",
    minQuantity:
      initial?.minQuantity != null ? String(initial.minQuantity) : "",
    image: initial?.image ?? "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState(initial?.image ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!imageFile) return;

    const previewUrl = URL.createObjectURL(imageFile);
    setImagePreview(previewUrl);

    return () => URL.revokeObjectURL(previewUrl);
  }, [imageFile]);

  const set =
    (key: keyof typeof f) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setF((current) => ({ ...current, [key]: e.target.value }));
    };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setImageFile(file);

    if (!file) {
      setImagePreview(f.image);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();

    const price = Number(f.price);
    const minQuantity = Number(f.minQuantity);
    const found: Record<string, string> = {};

    if (!f.name.trim()) found.name = "Enter a product name";
    if (!f.description.trim()) {
      found.description = "Enter a product description";
    }
    if (!f.categoryId) found.categoryId = "Choose a category";
    if (!(price > 0)) {
      found.price = "Price per 0.25 kg must be more than 0";
    }

    if (f.minQuantity.trim() && !(minQuantity > 0)) {
      found.minQuantity = "Minimum stock quantity must be more than 0";
    }

    setErrors(found);
    if (Object.keys(found).length > 0) return;

    onSubmit(
      {
        name: f.name.trim(),
        description: f.description.trim(),
        categoryId: f.categoryId,
        price,
        minQuantity: f.minQuantity.trim() ? minQuantity : 0,
        image: f.image.trim(),
      },
      imageFile,
    );
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-sale">
          {error}
        </p>
      )}

      <FormField label="Product name" error={errors.name}>
        <input
          autoFocus
          value={f.name}
          onChange={set("name")}
          className={inputClass}
          placeholder="Fresh Jordan Valley Tomatoes"
        />
      </FormField>

      <FormField label="Description" error={errors.description}>
        <textarea
          value={f.description}
          onChange={set("description")}
          className={`${inputClass} min-h-24 resize-y`}
          placeholder="Describe the product..."
          rows={3}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Category" error={errors.categoryId}>
          <select
            value={f.categoryId}
            onChange={set("categoryId")}
            className={inputClass}
          >
            <option value="">Choose a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Price per 0.25 kg (JOD)" error={errors.price}>
          <input
            type="number"
            step="0.01"
            min="0"
            value={f.price}
            onChange={set("price")}
            className={inputClass}
            placeholder="e.g. 0.50"
          />
        </FormField>

        <FormField
          label="Minimum stock quantity (kg)"
          error={errors.minQuantity}
        >
          <input
            type="number"
            step="0.25"
            min="0"
            value={f.minQuantity}
            onChange={set("minQuantity")}
            className={inputClass}
            placeholder="e.g. 5"
          />
        </FormField>
      </div>

      <FormField label="Product image">
        <label
          htmlFor="product-image-upload"
          className="relative block h-36 w-full cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-neutral-300 bg-neutral-50 hover:border-brand"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Product preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">
              Click to upload image
            </div>
          )}

          {imagePreview && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 text-sm font-medium text-white">
              Click to change image
            </div>
          )}

          <input
            id="product-image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </FormField>

      <FormButtons saving={saving} onCancel={onCancel} />
    </form>
  );
}
