import { useMemo, useState } from "react";
import { type Device, type DeviceFilters } from "../types/device";
import { FilterBar } from "./FilterBar";
import { DeviceDisplay } from "./DeviceDisplay";

const DEFAULT_FILTERS: DeviceFilters = {
  sortBy: "popularność",
  functions: [],
  energyClass: [],
  capacities: [],
  search: "",
};

function filterAndSortDevices(
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

export default function DevicesDisplay({ devices }: { devices: Device[] }) {
  const [filters, setFilters] = useState<DeviceFilters>(DEFAULT_FILTERS);
  const [selectedId, setSelectedId] = useState<string>(devices[2]?.id ?? "");

  const filteredDevices = useMemo(
    () => filterAndSortDevices(devices, filters),
    [devices, filters],
  );

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] -translate-y-0.5">
      <div className="h-16.5 bg-white">
        <h1
          className="text-center"
          style={{
            fontFamily: "SamsungOne",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "56px",
            color: "#000000",
          }}
        >
          Wybierz urządzenie
        </h1>
      </div>

      <div className="mx-auto max-w-360 min-h-[calc(100vh-4.125rem)]">
        <FilterBar
          filters={filters}
          onChange={setFilters}
          resultCount={filteredDevices.length}
        />

        <div className="grid gap-x-4 gap-y-5 grid-cols-3 pl-48 pr-50.5">
          {filteredDevices.map((d, idx) => (
            <DeviceDisplay
              key={d.id}
              device={d}
              isSelected={d.id === selectedId}
              onSelect={setSelectedId}
              isDisplayingInstallment={idx < 3} // don't know what the logic is, let's say first row
            />
          ))}
        </div>
      </div>

      <button className="flex h-5 w-29.5 mx-auto -translate-x-1.25 mt-5 mb-13.5 items-center gap-2.25">
        <span
          className="h-5 w-25.5 text-center text-[18px] font-bold leading-5 text-[#007AFF]"
          style={{
            fontFamily: "SamsungOne",
            fontStyle: "normal",
            fontWeight: 700,
          }}
        >
          Pokaż więcej
        </span>
        <span className="h-0 w-0 border-l-[3.5px] border-r-[3.5px] border-t-[7px] border-l-transparent border-r-transparent border-t-[#007AFF]" />
      </button>

      <div className="h-40.5 bg-white"></div>
    </div>
  );
}
