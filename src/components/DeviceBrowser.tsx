import React from "react";
import { type Device } from "../types/device";
import { FilterBar } from "./filters/FilterBar";
import { DeviceDisplay } from "./device/DeviceDisplay";
import { ShowMoreButton } from "./ShowMoreButton";
import { useDeviceFilters } from "../hooks/useDeviceFilters";

export default function DeviceBrowser({ devices }: { devices: Device[] }) {
  const useDeviceFiltersValues = useDeviceFilters(devices);

  return (
    <React.Fragment>
      <div className="mx-auto max-w-360 min-h-[calc(100vh-4.125rem)]">
        <FilterBar
          filterState={useDeviceFiltersValues}
          resultCount={useDeviceFiltersValues.filteredDevices.length}
        />

        <ul className="grid gap-x-4 gap-y-5 grid-cols-3 pl-48 pr-50.5">
          {useDeviceFiltersValues.filteredDevices.map((d, idx) => (
            <li key={d.id}>
              <DeviceDisplay
                device={d}
                isSelected={d.id === useDeviceFiltersValues.selectedId}
                onSelect={useDeviceFiltersValues.setSelectedId}
                isDisplayingInstallment={idx < 3} // don't know what the logic is, let's say first row
              />
            </li>
          ))}
        </ul>
      </div>

      <ShowMoreButton />
    </React.Fragment>
  );
}
