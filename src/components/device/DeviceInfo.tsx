import type { Device } from "../../types/device";

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
          <strong className="text-[#11151C]">
            {device.capacity.toString().replace(".", ",")}
          </strong>
        </p>

        <p>
          Wymiary (SxGxW):{" "}
          <strong className="text-[#11151C]">
            {device.dimensions.width} x {device.dimensions.depth} x{" "}
            {device.dimensions.height} cm
          </strong>
        </p>

        <p>
          Funkcje:{" "}
          <strong className="text-[#11151C]">
            {device.functions.join(", ")}
          </strong>
        </p>
      </div>
    </div>
  );
}
