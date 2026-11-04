import { Minus, Plus } from "lucide-react";
import { amountLabel, stepFor } from "../utils/format";
import type { Unit } from "../types";

interface Props {
  value: number;
  unit: Unit;
  onChange: (value: number) => void;
}
export function QuantityStepper({ value, unit, onChange }: Props) {
  const step = stepFor(unit);
  return (
    <div className="inline-flex items-center rounded-lg border border-line bg-white">
      <button
        aria-label="Decrease"
        className="grid h-9 w-9 place-items-center"
        onClick={() => onChange(value - step)}
      >
        <Minus size={14} />
      </button>
      <span className="min-w-20 text-center text-sm font-semibold">
        {amountLabel(value, unit)}
      </span>
      <button
        aria-label="Increase"
        className="grid h-9 w-9 place-items-center"
        onClick={() => onChange(value + step)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
