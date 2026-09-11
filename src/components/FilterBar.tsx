import { useState } from "react";
import {
  ENERGY_CLASSES,
  DEVICE_CAPACITIES,
  type DeviceFilters,
  type DeviceFunction,
  type EnergyClass,
  type DeviceCapacity,
  type SortOption,
} from "../types/device";
import { FilterDropdown } from "./FilterDropdown";
import { OptionRow } from "./OptionRow";

const ALL_FUNCTIONS: DeviceFunction[] = [
  "Drzwi AddWash™",
  "Panel AI Control",
  "Silnik inwerterowy",
  "Wyświetlacz elektroniczny",
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popularność", label: "Popularność" },
  { value: "cena", label: "Cena" },
  { value: "pojemność", label: "Pojemność" },
];

type DropdownKey = "sort" | "functions" | "energy" | "capacity";

type FilterBarProps = {
  filters: DeviceFilters;
  onChange: (filters: DeviceFilters) => void;
  resultCount: number;
};

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const toggleFunction = (fn: DeviceFunction) => {
    onChange({
      ...filters,
      functions: filters.functions.includes(fn)
        ? filters.functions.filter((f) => f !== fn)
        : [...filters.functions, fn],
    });
  };

  const toggleEnergyClass = (ec: EnergyClass) => {
    onChange({
      ...filters,
      energyClass: filters.energyClass.includes(ec)
        ? filters.energyClass.filter((e) => e !== ec)
        : [...filters.energyClass, ec],
    });
  };

  const toggleCapacity = (cap: DeviceCapacity) => {
    onChange({
      ...filters,
      capacities: filters.capacities.includes(cap)
        ? filters.capacities.filter((c) => c !== cap)
        : [...filters.capacities, cap],
    });
  };

  const sortLabel =
    SORT_OPTIONS.find((o) => o.value === filters.sortBy)?.label ??
    "Popularność";
  const functionsLabel = filters.functions.length
    ? `Wybrano: ${filters.functions.length}`
    : "Pokaż wszystkie";
  const energyLabel = filters.energyClass.length
    ? filters.energyClass.join(", ")
    : "Pokaż wszystkie";
  const capacityLabel = filters.capacities.length
    ? filters.capacities.map((c) => `${c} kg`).join(", ")
    : "Pokaż wszystkie";

  return (
    <div className="mb-6 mx-51.25">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => onChange({ ...filters, search: e.target.value })}
        placeholder="Search..."
        className="ml-87.75 mr-107.5 mt-5.75 mb-8 flex flex-col items-start gap-2.5 px-3 py-2 bg-white placeholder:text-black"
        style={{
          fontFamily: "SamsungOne",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22px",
        }}
      />

      <div className="mb-3 flex flex-wrap gap-3">
        <FilterDropdown
          label="Sortuj po:"
          value={sortLabel}
          isOpen={openDropdown === "sort"}
          onToggle={(open) => setOpenDropdown(open ? "sort" : null)}
        >
          {SORT_OPTIONS.map((o) => (
            <OptionRow
              key={o.value}
              label={o.label}
              onClick={() => {
                onChange({ ...filters, sortBy: o.value });
                setOpenDropdown(null);
              }}
            />
          ))}
        </FilterDropdown>

        <FilterDropdown
          label="Funkcje:"
          value={functionsLabel}
          isOpen={openDropdown === "functions"}
          onToggle={(open) => setOpenDropdown(open ? "functions" : null)}
        >
          {ALL_FUNCTIONS.map((fn) => (
            <OptionRow key={fn} label={fn} onClick={() => toggleFunction(fn)} />
          ))}
        </FilterDropdown>

        <FilterDropdown
          label="Klasa energetyczna:"
          value={energyLabel}
          isOpen={openDropdown === "energy"}
          onToggle={(open) => setOpenDropdown(open ? "energy" : null)}
        >
          {ENERGY_CLASSES.map((ec) => (
            <OptionRow
              key={ec}
              label={ec}
              onClick={() => toggleEnergyClass(ec)}
            />
          ))}
        </FilterDropdown>

        <FilterDropdown
          label="Pojemność:"
          value={capacityLabel}
          isOpen={openDropdown === "capacity"}
          onToggle={(open) => setOpenDropdown(open ? "capacity" : null)}
        >
          {DEVICE_CAPACITIES.map((cap) => (
            <OptionRow
              key={cap}
              label={`${cap} kg`}
              onClick={() => toggleCapacity(cap)}
            />
          ))}
        </FilterDropdown>
      </div>

      <p
        className="text-[13px] text-[#6B7280]"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        Liczba wyników: {resultCount}
      </p>
    </div>
  );
}
