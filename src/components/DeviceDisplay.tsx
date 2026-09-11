import type { Device } from "../types/device";
import { EnergyBadge } from "./EnergyBadge";

type DeviceDisplayProps = {
  device: Device;
  isSelected: boolean;
  onSelect: (id: Device["id"]) => void;
};

export function DeviceDisplay({
  device,
  isSelected,
  onSelect,
}: DeviceDisplayProps) {
  return (
    <div
      key={device.id}
      className="w-84.5 h-150.75 flex flex-col rounded-[10px] bg-white px-6 py-6.25"
    >
      <div className="h-50">
        <img className="h-50 mx-auto" src={device.image} alt={device.name} />
      </div>

      <div className="mt-3 mb-4">
        <h3
          className="pb-6.75 text-black "
          style={{
            fontFamily: "SamsungOne",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "22px",
            fontSize: "18px",
          }}
        >
          {device.model}, {device.name.replace(/^Pralka [^,]+, /, "")}
        </h3>

        <div
          className="mb-3 space-y-1 text-[12.5px] leading-relaxed text-[#6B7280]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          <p>
            Pojemność (kg):{" "}
            <span className="font-semibold text-[#11151C]">
              {device.capacity}
            </span>
          </p>
          <p>
            Wymiary (SxGxW):{" "}
            <span className="font-semibold text-[#11151C]">
              {device.dimensions.width} x {device.dimensions.depth} x{" "}
              {device.dimensions.height} cm
            </span>
          </p>
          <p>
            Funkcje:{" "}
            <span className="font-semibold text-[#11151C]">
              {device.functions.join(", ")}
            </span>
          </p>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span
            className="text-[12.5px] text-[#6B7280]"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Klasa energetyczna
          </span>
          <EnergyBadge energyClass={device.energyClass} />
        </div>

        <p
          className="mb-2 text-[11.5px] text-[#9AA2AF]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Cena obowiązuje:{" "}
          {device.priceValidFrom.split("-").reverse().join(".")} -{" "}
          {device.priceValidTo.split("-").reverse().join(".")}
        </p>

        <div
          className="mb-1 flex items-baseline gap-1"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          <span className="text-[26px] font-semibold text-[#11151C]">
            {Math.trunc(device.price)}
          </span>
          <span className="text-[13px] font-semibold text-[#11151C]">
            {(device.price % 1).toFixed(2).slice(2)} zł
          </span>
        </div>
        <p
          className="mb-4 text-[12.5px] text-[#6B7280]"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {device.installment.amount.toFixed(2).replace(".", ",")} zł x{" "}
          {device.installment.months} rat
        </p>
      </div>

      <button
        type="button"
        onClick={() => onSelect(device.id)}
        className={`mt-auto rounded-full py-2.5 text-[13px] font-semibold tracking-wide transition-colors ${
          isSelected
            ? "bg-[#11151C] text-white"
            : "bg-[#1447E6] text-white hover:bg-[#0F3DB8]"
        }`}
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {isSelected ? "WYBRANE" : "WYBIERZ"}
      </button>
    </div>
  );
}
