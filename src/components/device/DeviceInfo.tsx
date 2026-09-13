import type { Device } from "../../types/device";
import { EnergyBadge } from "./EnergyBadge";

type DeviceInfoProps = {
  device: Device;
};

export function DeviceInfo({ device }: DeviceInfoProps) {
  const specs = [
    {
      label: "Pojemność (kg):",
      value: device.capacity.toString().replace(".", ","),
    },
    {
      label: "Wymiary (SxGxW):",
      value: `${device.dimensions.width} x ${device.dimensions.depth} x ${device.dimensions.height} cm`,
    },
    {
      label: "Funkcje:",
      value: device.functions.join(", "),
    },
  ];

  return (
    <div className="mt-3 mb-4">
      <h2
        className="pb-7.25 text-black"
        style={{
          fontFamily: "SamsungOne",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "22px",
          fontSize: "18px",
        }}
      >
        {device.name}
      </h2>

      <div
        className="mt-2 text-[#767676]"
        style={{
          fontFamily: "SamsungOne",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "18px",
          fontSize: "12px",
        }}
      >
        {specs.map(({ label, value }) => (
          <div key={label}>
            <span className="inline-block">{label}</span>{" "}
            <span
              className="text-[#11151C]"
              style={{
                fontFamily: "SamsungOne",
                fontStyle: "normal",
                fontWeight: 700,
                lineHeight: "18px",
                fontSize: "12px",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <span
          className="text-[#767676] inline-block"
          style={{
            fontFamily: "SamsungOne",
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "18px",
            fontSize: "12px",
          }}
        >
          Klasa energetyczna
        </span>

        <EnergyBadge energyClass={device.energyClass} />
      </div>
    </div>
  );
}
