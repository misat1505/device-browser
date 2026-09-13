import type { Device } from "../../types/device";

type DeviceSelectButtonProps = {
  deviceId: Device["id"];
  isSelected: boolean;
  onSelect: (id: Device["id"]) => void;
};

export function DeviceSelectButton({
  deviceId,
  isSelected,
  onSelect,
}: DeviceSelectButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(deviceId)}
      className={`mx-auto flex h-9 items-center justify-center gap-2.5 rounded-3xl px-10 py-3.5 leading-4 uppercase tracking-[0.15em] transition-colors ${
        isSelected
          ? "w-39.5 bg-[#11151C] text-white"
          : "w-37.5 bg-[#1428A0] text-white hover:bg-[#1428A0]"
      }`}
      style={{
        fontFamily: "SamsungOne",
        fontStyle: "normal",
        fontWeight: 700,
        lineHeight: "16px",
        fontSize: "14px",
      }}
    >
      {isSelected ? "WYBRANE" : "WYBIERZ"}
    </button>
  );
}
