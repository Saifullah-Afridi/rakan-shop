// import { ChevronDown } from "lucide-react";
// import type { ReactNode } from "react";
// import { CATEGORIES } from "../data/categories";

// interface Props {
//   params: URLSearchParams;
//   onChange: (key: string, value: string | null) => void;
//   total: number;
// }

// function Select({
//   value,
//   onChange,
//   dark = false,
//   children,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   dark?: boolean;
//   children: ReactNode;
// }) {
//   return (
//     <label
//       className={`relative inline-flex h-9 items-center rounded-lg border text-xs font-medium ${dark ? "border-brand bg-brand text-white" : "border-line bg-white"}`}
//     >
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className="h-full cursor-pointer appearance-none bg-transparent pl-3 pr-8 text-inherit [&>option]:text-black"
//       >
//         {children}
//       </select>
//       <ChevronDown
//         size={14}
//         className="pointer-events-none absolute right-2.5"
//       />
//     </label>
//   );
// }

// // Each filter is stored in the page URL, so links and the back button just work.
// export function FilterBar({ params, onChange, total }: Props) {
//   const offersOn = params.get("offers") === "1";
//   const set = (key: string) => (v: string) =>
//     onChange(key, v === "" ? null : v);
//   return (
//     <div className="mb-5 flex flex-wrap items-center gap-2.5">
//       <Select
//         dark
//         value={params.get("category") ?? ""}
//         onChange={set("category")}
//       >
//         <option value="">All categories</option>
//         {CATEGORIES.map((c) => (
//           <option key={c.id} value={c.id}>
//             {c.name}
//           </option>
//         ))}
//       </Select>

//       <div className="ml-auto">
//         <Select value={params.get("sort") ?? ""} onChange={set("sort")}>
//           <option value="">Sort by</option>
//           <option value="price-asc">Price: low to high</option>
//           <option value="price-desc">Price: high to low</option>
//           <option value="rating">Top rated</option>
//         </Select>
//       </div>
//     </div>
//   );
// }

import {
  Apple,
  Beef,
  Carrot,
  ChevronDown,
  CupSoda,
  ListFilter,
  Milk,
  Wheat,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CATEGORIES } from "../data/categories";

interface Props {
  params: URLSearchParams;
  onChange: (key: string, value: string | null) => void;
  total: number;
}

const categoryIcons: Record<string, LucideIcon> = {
  Carrot,
  Apple,
  Beef,
  Milk,
  CupSoda,
  Wheat,
};

export function FilterBar({ params, onChange }: Props) {
  const selectedCategory = params.get("category") ?? "";

  const selectCategory = (categoryId: string) => {
    onChange("category", categoryId || null);
  };

  return (
    <div className="mb-5 flex items-center gap-2">
      {/* Horizontally scrollable category tabs */}
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => selectCategory("")}
          className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium cursor-pointer transition-colors ${
            selectedCategory === ""
              ? "border-brand bg-brand text-white"
              : "border-line bg-white text-neutral-700 hover:border-brand hover:text-brand"
          }`}
        >
          <ListFilter size={16} />
          All
        </button>

        {CATEGORIES.map((category) => {
          const Icon = categoryIcons[category.icon];
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => selectCategory(category.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium  cursor-pointer transition-colors ${
                isActive
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white text-neutral-700 hover:border-brand hover:text-brand"
              }`}
            >
              {Icon && (
                <Icon
                  size={16}
                  style={{ color: isActive ? "currentColor" : category.color }}
                />
              )}
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Sort dropdown */}
      <div className="shrink-0">
        <label className="relative inline-flex h-10 items-center rounded-lg border border-line bg-white text-sm font-medium">
          <select
            value={params.get("sort") ?? ""}
            onChange={(e) =>
              onChange("sort", e.target.value === "" ? null : e.target.value)
            }
            className="h-full cursor-pointer appearance-none bg-transparent pl-4 pr-9 text-inherit [&>option]:text-black"
          >
            <option value="">Sort by</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="rating">Top rated</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 text-neutral-500"
          />
        </label>
      </div>
    </div>
  );
}
