import type { Device } from "../../types/device";
import { EnergyBadge } from "./EnergyBadge";

type DeviceInfoProps = {
  device: Device;
};

export function DeviceInfo({ device }: DeviceInfoProps) {
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
        <p>
          Pojemność (kg):{" "}
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
            {device.capacity.toString().replace(".", ",")}
          </span>
        </p>

        <p>
          Wymiary (SxGxW):{" "}
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
            {device.dimensions.width} x {device.dimensions.depth} x{" "}
            {device.dimensions.height} cm
          </span>
        </p>

        <p>
          Funkcje:{" "}
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
            {device.functions.join(", ")}
          </span>
        </p>
      </div>

      <div className="mt-3.5 flex items-center gap-2">
        <span
          className="text-[#767676]"
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
