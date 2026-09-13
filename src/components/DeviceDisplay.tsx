import type { Device } from "../types/device";
import { EnergyBadge } from "./device/EnergyBadge";

type DeviceDisplayProps = {
  device: Device;
  isSelected: boolean;
  isDisplayingInstallment: boolean;
  onSelect: (id: Device["id"]) => void;
};

export function DeviceDisplay({
  device,
  isSelected,
  onSelect,
  isDisplayingInstallment,
}: DeviceDisplayProps) {
  function formatPrice(price: Device["price"]) {
    const number = Math.trunc(price).toString();

    if (number.length <= 3) return number;

    const thousands = number.slice(0, -3);
    const rest = number.slice(-3);

    return `${thousands} ${rest}`;
  }

  return (
    <div
      key={device.id}
      className="w-84.5 flex flex-col rounded-[20px] bg-white px-6 py-6.25"
    >
      <div className="h-50">
        <img className="h-50 mx-auto" src={device.image} alt={device.name} />
      </div>

      <div className="mt-3 mb-4">
        <h3
          className="pb-7.25 text-black "
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
        <div className="my-3.5 flex items-center gap-2">
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

        <div
          className="flex flex-col items-start gap-px"
          style={{ fontFamily: "SamsungOne" }}
        >
          <p className="m-0 text-[12px] leading-4.5 font-normal text-[#767676]">
            Cena obowiązuje:{" "}
            {device.priceValidFrom.split("-").reverse().join(".")} -{" "}
            {device.priceValidTo.split("-").reverse().join(".")}
          </p>

          <div className="flex h-10 items-center gap-0.5 -mt-px">
            <span className="text-[40px] leading-10 font-bold text-black">
              {formatPrice(device.price)}
            </span>

            <span className="w-4.75 text-right text-[14px] leading-4 font-bold text-black">
              {(device.price % 1).toFixed(2).slice(2)} zł
            </span>
          </div>
        </div>

        {isDisplayingInstallment ? (
          <p
            className="text-[#555555] mt-3.5"
            style={{
              fontFamily: "SamsungOne",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "18px",
              fontSize: "16px",
            }}
          >
            {device.installment.amount.toFixed(2).replace(".", ",")} zł x{" "}
            {device.installment.months} rat
          </p>
        ) : null}
      </div>

      <button
        type="button"
        onClick={() => onSelect(device.id)}
        className={`mx-auto flex h-9 w-37.5 items-center justify-center gap-2.5 rounded-3xl px-10 py-3.5 leading-4 uppercase tracking-[0.15em] transition-colors ${
          isSelected
            ? "bg-[#11151C] text-white w-39.5"
            : "bg-[#1428A0] text-white hover:bg-[#1428A0]"
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
    </div>
  );
}
