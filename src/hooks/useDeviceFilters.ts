import { useState } from "react";
import type {
  Device,
  DeviceCapacity,
  DeviceFilters,
  DeviceFunction,
  EnergyClass,
  SortOption,
} from "../types/device";
import {
  DEFAULT_DEVICES_FILTERS,
  filterAndSortDevices,
} from "../utils/deviceUtils";

type DropdownKey = "sort" | "functions" | "energy" | "capacity";

type UseDeviceFiltersReturnType = {
  filteredDevices: Device[];
  selectedId: Device["id"];
  setSelectedId: (id: Device["id"]) => void;
  filters: DeviceFilters;
  setFilters: (filters: DeviceFilters) => void;
  setSearch: (search: string) => void;
  openDropdown: DropdownKey | null;
  setOpenDropdown: (key: DropdownKey | null) => void;
  sortLabel: string;
  functionsLabel: string;
  energyLabel: string;
  capacityLabel: string;
  toggleFunction: (fn: DeviceFunction) => void;
  toggleEnergyClass: (ec: EnergyClass) => void;
  toggleCapacity: (cap: DeviceCapacity) => void;
  setSort: (sortBy: SortOption) => void;
  clearFunctions: () => void;
  clearEnergyClass: () => void;
  clearCapacity: () => void;
};

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "popularność", label: "Popularność" },
  { value: "cena", label: "Cena" },
  { value: "pojemność", label: "Pojemność" },
];

export function useDeviceFilters(
  devices: Device[],
): UseDeviceFiltersReturnType {
  const [filters, setFilters] = useState<DeviceFilters>(
    DEFAULT_DEVICES_FILTERS,
  );

  const [selectedId, setSelectedId] = useState<Device["id"]>(
    devices[2]?.id ?? "",
  );

  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);

  const filteredDevices = filterAndSortDevices(devices, filters);

  const setSearch = (search: string) => {
    setFilters((prev) => ({
      ...prev,
      search,
    }));
  };

  const toggleFunction = (fn: DeviceFunction) => {
    setFilters((prev) => ({
      ...prev,
      functions: prev.functions.includes(fn)
        ? prev.functions.filter((f) => f !== fn)
        : [...prev.functions, fn],
    }));
  };

  const toggleEnergyClass = (ec: EnergyClass) => {
    setFilters((prev) => ({
      ...prev,
      energyClass: prev.energyClass.includes(ec)
        ? prev.energyClass.filter((e) => e !== ec)
        : [...prev.energyClass, ec],
    }));
  };

  const toggleCapacity = (cap: DeviceCapacity) => {
    setFilters((prev) => ({
      ...prev,
      capacities: prev.capacities.includes(cap)
        ? prev.capacities.filter((c) => c !== cap)
        : [...prev.capacities, cap],
    }));
  };

  const sortLabel =
    SORT_OPTIONS.find((option) => option.value === filters.sortBy)?.label ??
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

  const setSort = (sortBy: SortOption) => {
    setFilters((prev) => ({
      ...prev,
      sortBy,
    }));

    setOpenDropdown(null);
  };

  const clearFunctions = () => {
    setFilters((prev) => ({
      ...prev,
      functions: [],
    }));

    setOpenDropdown(null);
  };

  const clearEnergyClass = () => {
    setFilters((prev) => ({
      ...prev,
      energyClass: [],
    }));

    setOpenDropdown(null);
  };

  const clearCapacity = () => {
    setFilters((prev) => ({
      ...prev,
      capacities: [],
    }));

    setOpenDropdown(null);
  };

  return {
    filteredDevices,
    selectedId,
    setSelectedId,
    filters,
    setFilters,
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
  };
}
