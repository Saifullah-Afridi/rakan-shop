import type { ReactNode } from "react";

export function PageHeader({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold text-brand">{title}</h1>
        <p className="mt-1 text-sm text-muted">{text}</p>
      </div>
      {action}
    </div>
  );
}
