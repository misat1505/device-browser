import {
  ENERGY_CLASSES,
  DEVICE_CAPACITIES,
  type DeviceFunction,
  type SortOption,
} from "../../types/device";
import { useDeviceFilters } from "../../hooks/useDeviceFilters";
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

type DropdownOption = {
  label: string;
  onClick: () => void;
  className?: string;
};

type DropdownConfig = {
  key: DropdownKey;
  label: string;
  value: string;
  labelOffset?: boolean;
  arrowOffset?: boolean;
  options: DropdownOption[];
};

type FilterBarProps = {
  filterState: ReturnType<typeof useDeviceFilters>;
  resultCount: number;
};

export function FilterBar({ filterState, resultCount }: FilterBarProps) {
  const {
    filters,
    setSearch,
    openDropdown,
    setOpenDropdown,
    sortLabel,
    functionsLabel,
    energyLabel,
    capacityLabel,
    toggleFunction,
    toggleEnergyClass,
    toggleCapacity,
    setSort,
    clearFunctions,
    clearEnergyClass,
    clearCapacity,
  } = filterState;

  const dropdowns: DropdownConfig[] = [
    {
      key: "sort",
      label: "Sortuj po:",
      value: sortLabel,
      labelOffset: true,
      options: [
        {
          label: "Wszystkie",
          onClick: () => setSort("popularność"),
          className: "-pt-px",
        },
        ...SORT_OPTIONS.map((option) => ({
          label: option.label,
          onClick: () => setSort(option.value),
        })),
      ],
    },
    {
      key: "functions",
      label: "Funkcje:",
      value: functionsLabel,
      labelOffset: true,
      options: [
        {
          label: "Wszystkie",
          onClick: clearFunctions,
          className: "-pt-px",
        },
        ...ALL_FUNCTIONS.map((fn) => ({
          label: fn,
          onClick: () => toggleFunction(fn),
        })),
      ],
    },
    {
      key: "energy",
      label: "Klasa energetyczna:",
      value: energyLabel,
      arrowOffset: true,
      options: [
        {
          label: "Wszystkie",
          onClick: clearEnergyClass,
          className: "-pt-px",
        },
        ...ENERGY_CLASSES.map((ec) => ({
          label: ec,
          onClick: () => toggleEnergyClass(ec),
        })),
      ],
    },
    {
      key: "capacity",
      label: "Pojemność:",
      value: capacityLabel,
      arrowOffset: true,
      options: [
        {
          label: "Wszystkie",
          onClick: clearCapacity,
          className: "-pt-px",
        },
        ...DEVICE_CAPACITIES.map((cap) => ({
          label: `${cap}kg`,
          onClick: () => toggleCapacity(cap),
        })),
      ],
    },
  ];

  return (
    <div className="mb-3 ml-51.25 mr-50.75">
      <input
        type="text"
        value={filters.search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Search..."
        className="ml-87.75 mr-107.5 mt-5.75 mb-8 flex flex-col items-start gap-2.5 bg-white px-3 py-2 placeholder:text-black translate-y-0.5"
        style={{
          fontFamily: "SamsungOne",
          fontWeight: 400,
          fontSize: "14px",
          lineHeight: "22px",
        }}
      />

      <div className="mb-2 flex flex-wrap gap-3">
        {dropdowns.map((dropdown) => (
          <FilterDropdown
            key={dropdown.key}
            label={dropdown.label}
            value={dropdown.value}
            isOpen={openDropdown === dropdown.key}
            onToggle={(open) => setOpenDropdown(open ? dropdown.key : null)}
            labelOffset={dropdown.labelOffset}
            arrowOffset={dropdown.arrowOffset}
          >
            {dropdown.options.map((option) => (
              <OptionRow
                key={option.label}
                label={option.label}
                className={option.className}
                onClick={option.onClick}
                isSelected={dropdown.value === option.label}
              />
            ))}
          </FilterDropdown>
        ))}
      </div>

      <p
        className="ml-0.75 text-black"
        aria-live="polite"
        aria-atomic="true"
        style={{
          fontFamily: "SamsungOne",
          fontWeight: 400,
          lineHeight: "22px",
          fontSize: "14px",
        }}
      >
        Liczba wyników: {resultCount}
      </p>
    </div>
  );
}
