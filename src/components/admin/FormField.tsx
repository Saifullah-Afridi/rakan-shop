import type { ReactNode } from "react";

// Use this class on every input, select and textarea so forms look the same.
export const inputClass = "h-10 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-brand-light";

export function FormField({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-sale">{error}</span>}
    </label>
  );
}

export function FormButtons({ saving, onCancel }: { saving: boolean; onCancel: () => void }) {
  return (
    <div className="mt-6 flex justify-end gap-2">
      <button type="button" onClick={onCancel} className="h-10 rounded-lg border border-line px-4 text-sm font-medium">Cancel</button>
      <button type="submit" disabled={saving} className="h-10 rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-light disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
