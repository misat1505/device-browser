import type { Device } from "../types/device";

export function EnergyBadge({ energyClass }: Pick<Device, "energyClass">) {
  const width = 49;
  const height = 18;

  return (
    <div className="flex items-center gap-1.5 -mt-px ml-px">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d="M0 17V1C0 0.447715 0.447716 0 1 0H42.4648C42.7992 0 43.1114 0.167102 43.2969 0.4453L48.6302 8.4453C48.8541 8.7812 48.8541 9.2188 48.6302 9.5547L43.2969 17.5547C43.1114 17.8329 42.7992 18 42.4648 18H1C0.447715 18 0 17.5523 0 17Z"
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
