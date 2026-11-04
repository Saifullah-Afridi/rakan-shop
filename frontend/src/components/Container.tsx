import type { ReactNode } from "react";
// Every section uses this, so the page width is changed in ONE place.
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 xl:px-10 ${className}`}
    >
      {children}
    </div>
  );
}
