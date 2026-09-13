import type { Device } from "../../types/device";
import { DeviceImage } from "./DeviceImage";
import { DeviceInfo } from "./DeviceInfo";
import { DeviceInstallment } from "./DeviceInstallment";
import { DevicePrice } from "./DevicePrice";
import { DeviceSelectButton } from "./DeviceSelectButton";

type DeviceDisplayProps = {
  device: Device;
  isSelected: boolean;
  isDisplayingInstallment: boolean;
  onSelect: (id: Device["id"]) => void;
};

export function DeviceDisplay({
  device,
  isSelected,
  isDisplayingInstallment,
  onSelect,
}: DeviceDisplayProps) {
  return (
    <div className="flex w-84.5 flex-col rounded-[20px] bg-white px-6 py-6.25">
      <DeviceImage src={device.image} alt={device.name} />

      <DeviceInfo device={device} />

      <DevicePrice
        price={device.price}
        validFrom={device.priceValidFrom}
        validTo={device.priceValidTo}
      />

      {isDisplayingInstallment && (
        <DeviceInstallment
          amount={device.installment.amount}
          months={device.installment.months}
        />
      )}

      <DeviceSelectButton
        deviceName={device.name}
        deviceId={device.id}
        isSelected={isSelected}
        onSelect={onSelect}
      />
    </div>
  );
}
