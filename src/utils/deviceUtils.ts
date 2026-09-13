import type { Device, DeviceFilters } from "../types/device";

export function filterAndSortDevices(
  devices: Device[],
  filters: DeviceFilters,
): Device[] {
  const query = filters.search.trim().toLowerCase();

  const result = devices.filter((d) => {
    const matchSearch =
      query === "" ||
      d.name.toLowerCase().includes(query) ||
      d.model.toLowerCase().includes(query);

    const matchFunctions =
      filters.functions.length === 0 ||
      filters.functions.every((f) => d.functions.includes(f));

    const matchEnergy =
      filters.energyClass.length === 0 ||
      filters.energyClass.includes(d.energyClass);

    const matchCapacity =
      filters.capacities.length === 0 ||
      filters.capacities.includes(d.capacity);

    return matchSearch && matchFunctions && matchEnergy && matchCapacity;
  });

  if (filters.sortBy === "cena") {
    return [...result].sort((a, b) => a.price - b.price);
  }
  if (filters.sortBy === "pojemność") {
    return [...result].sort((a, b) => a.capacity - b.capacity);
  }
  return result;
}

export const DEFAULT_DEVICES_FILTERS: DeviceFilters = {
  sortBy: "popularność",
  functions: [],
  energyClass: [],
  capacities: [],
  search: "",
};
