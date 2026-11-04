import { Modal } from "./Modal";

interface Props {
  title: string;
  text: string;
  confirmLabel: string;
  busy: boolean;
  error?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ title, text, confirmLabel, busy, error, onConfirm, onCancel }: Props) {
  return (
    <Modal title={title} onClose={onCancel}>
      <p className="text-sm text-muted">{text}</p>
      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-sale">{error}</p>}
      <div className="mt-6 flex justify-end gap-2">
        <button onClick={onCancel} className="h-10 rounded-lg border border-line px-4 text-sm font-medium">Cancel</button>
        <button onClick={onConfirm} disabled={busy} className="h-10 rounded-lg bg-sale px-4 text-sm font-semibold text-white disabled:opacity-50">
          {busy ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
