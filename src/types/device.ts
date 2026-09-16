export const ENERGY_CLASSES = ["A", "B", "C", "D", "E", "F"] as const;

export const DEVICE_CAPACITIES = [8, 9, 10.5] as const;

export type DeviceFunction =
  | "Drzwi AddWash™"
  | "Panel AI Control"
  | "Silnik inwerterowy"
  | "Wyświetlacz elektroniczny";

export type EnergyClass = (typeof ENERGY_CLASSES)[number];

export type DeviceCapacity = (typeof DEVICE_CAPACITIES)[number];

type DeviceColor = "biała" | "inox" | "czarna";

export type SortOption = "popularność" | "cena" | "pojemność";

export type Device = {
  id: string;
  model: string;
  name: string;
  image: string;

  capacity: DeviceCapacity;
  color: DeviceColor;

  dimensions: {
    width: number;
    depth: number;
    height: number;
  };

  functions: DeviceFunction[];

  energyClass: EnergyClass;

  price: number;
  priceValidFrom: string;
  priceValidTo: string;

  installment: {
    amount: number;
    months: number;
  };
};

export type DeviceFilters = {
  sortBy: SortOption;
  functions: DeviceFunction[];
  energyClass: EnergyClass[];
  capacities: DeviceCapacity[];
  search: string;
};
