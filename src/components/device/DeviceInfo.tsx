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
      <h3
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
      </h3>

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
            <h4 className="inline-block">{label}</h4>{" "}
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
        <h4
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
        </h4>

        <EnergyBadge energyClass={device.energyClass} />
      </div>
    </div>
  );
}
