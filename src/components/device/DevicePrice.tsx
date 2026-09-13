import type { Device } from "../../types/device";

type DevicePriceProps = {
  price: Device["price"];
  validFrom: string;
  validTo: string;
};

function formatPrice(price: number) {
  const number = Math.trunc(price).toString();

  if (number.length <= 3) {
    return number;
  }

  const thousands = number.slice(0, -3);
  const rest = number.slice(-3);

  return `${thousands} ${rest}`;
}

function formatDate(date: string) {
  return date.split("-").reverse().join(".");
}

export function DevicePrice({ price, validFrom, validTo }: DevicePriceProps) {
  return (
    <div
      className="flex flex-col items-start gap-px"
      style={{ fontFamily: "SamsungOne" }}
    >
      <p className="m-0 text-[12px] leading-4.5 font-normal text-[#767676]">
        Cena obowiązuje: {formatDate(validFrom)} - {formatDate(validTo)}
      </p>

      <div className="flex h-10 items-center gap-0.5 -mt-px">
        <span className="text-[40px] leading-10 font-bold text-black">
          {formatPrice(price)}
        </span>

        <span className="w-4.75 text-right text-[14px] leading-4 font-bold text-black">
          {(price % 1).toFixed(2).slice(2)} zł
        </span>
      </div>
    </div>
  );
}
