// One place for empty and error messages.
export function Message({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: { label: string; onClick: () => void };
}) {
  return (
    <div className="rounded-2xl bg-card px-6 py-14 text-center">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted">{text}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="mt-5 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
