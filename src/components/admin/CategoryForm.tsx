import {
  useEffect,
  useState,
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
} from "react";
import type { Category, IconKey } from "../../types";
import type { CategoryInput } from "../../types/admin";
import { CATEGORY_ICONS, ICON_KEYS } from "../../utils/categoryIcons";
import { FormButtons, FormField, inputClass } from "./FormField";

interface Props {
  initial?: Category;
  saving: boolean;
  error?: string;
  onSubmit: (input: CategoryInput, imageFile: File | null) => void;
  onCancel: () => void;
}

export function CategoryForm({
  initial,
  saving,
  error,
  onSubmit,
  onCancel,
}: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [icon, setIcon] = useState<IconKey>(initial?.icon ?? "Carrot");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(initial?.image ?? "");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(initial?.image ?? "");
      return;
    }

    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile, initial?.image]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageFile(event.target.files?.[0] ?? null);
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      setImageFile(file);
    }
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setNameError("Enter a category name");
      return;
    }

    setNameError("");

    onSubmit(
      {
        name: trimmedName,
        description: initial?.description ?? "",
        icon,
        color: initial?.color ?? "#0a4a2a",
        tint: initial?.tint ?? "#d9ecd9",
        image: initial?.image ?? "",
      },
      imageFile,
    );
  };

  const SelectedIcon = CATEGORY_ICONS[icon];

  return (
    <form onSubmit={submit} className="space-y-4">
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-sale">
          {error}
        </p>
      )}

      <FormField label="Name" error={nameError}>
        <input
          autoFocus
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
          placeholder="Vegetables"
        />
      </FormField>

      <FormField label="Category icon">
        <select
          value={icon}
          onChange={(event) => setIcon(event.target.value as IconKey)}
          className={inputClass}
        >
          {ICON_KEYS.map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <div className="mt-2 flex items-center gap-2 text-sm text-muted">
          <SelectedIcon size={20} />
          <span>Selected icon: {icon}</span>
        </div>
      </FormField>

      <FormField label="Category image">
        <label
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="group relative flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-border bg-card transition hover:border-primary"
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
          />

          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt={name || "Category preview"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute inset-0 grid place-items-center bg-black/40 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
                Click to change image
              </span>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2 px-4 py-6 text-center">
              <SelectedIcon size={32} />
              <span className="text-sm font-medium">
                Click to upload or drag an image here
              </span>
              <span className="text-xs text-muted">PNG, JPG, or WebP</span>
            </div>
          )}
        </label>
      </FormField>

      <FormButtons saving={saving} onCancel={onCancel} />
    </form>
  );
}
