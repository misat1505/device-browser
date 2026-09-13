import type { Device } from "../types/device";

export function EnergyBadge({ energyClass }: Pick<Device, "energyClass">) {
  const width = 49;
  const height = 18;

  return (
    <div className="flex items-center gap-1.5">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={`M0 0 H${width - 8} L${width} 9 L${width - 8} 18 H0 Z`}
          fill="#009949"
        />
        <text
          x="6"
          y={height / 2 + 1}
          dominantBaseline="middle"
          fontSize="12"
          fontWeight="700"
          fill="#fff"
          fontFamily="SamsungOne"
        >
          {energyClass}
        </text>
      </svg>
    </div>
  );
}
