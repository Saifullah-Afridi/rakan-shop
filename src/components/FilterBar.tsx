import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { CATEGORIES } from "../data/categories";

interface Props {
  params: URLSearchParams;
  onChange: (key: string, value: string | null) => void;
  total: number;
}

function Select({
  value,
  onChange,
  dark = false,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  dark?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={`relative inline-flex h-9 items-center rounded-lg border text-xs font-medium ${dark ? "border-brand bg-brand text-white" : "border-line bg-white"}`}
    >
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-full cursor-pointer appearance-none bg-transparent pl-3 pr-8 text-inherit [&>option]:text-black"
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5"
      />
    </label>
  );
}

// Each filter is stored in the page URL, so links and the back button just work.
export function FilterBar({ params, onChange, total }: Props) {
  const offersOn = params.get("offers") === "1";
  const set = (key: string) => (v: string) =>
    onChange(key, v === "" ? null : v);
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2.5">
      <Select
        dark
        value={params.get("category") ?? ""}
        onChange={set("category")}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>
      <Select value={params.get("price") ?? ""} onChange={set("price")}>
        <option value="">Price</option>
        <option value="lt1">Under 1 JOD</option>
        <option value="1to5">1 to 5 JOD</option>
        <option value="gt5">Over 5 JOD</option>
      </Select>
      <Select value={params.get("rating") ?? ""} onChange={set("rating")}>
        <option value="">Review</option>
        <option value="4.6">4.6 and up</option>
        <option value="4.8">4.8 and up</option>
      </Select>
      <button
        onClick={() => onChange("offers", offersOn ? null : "1")}
        aria-pressed={offersOn}
        className={`h-9 rounded-lg border px-3 text-xs font-medium ${offersOn ? "border-brand bg-brand text-white" : "border-line bg-white"}`}
      >
        Offers only
      </button>
      <span className="ml-1 text-xs text-muted">{total} items</span>
      <div className="ml-auto">
        <Select value={params.get("sort") ?? ""} onChange={set("sort")}>
          <option value="">Sort by</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
        </Select>
      </div>
    </div>
  );
}
