import { useState } from "react";
import { type Device } from "../types/device";
import { EnergyBadge } from "./EnergyBadge";

export default function DevicesDisplay({ devices }: { devices: Device[] }) {
  const [selectedId, setSelectedId] = useState<string>(devices[0]?.id ?? "");

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] px-4 py-10 sm:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="mx-auto max-w-295">
        <h1
          className="mb-8 text-center text-[28px] font-semibold text-[#11151C]"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Wybierz urządzenie
        </h1>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((d) => {
            const isSelected = d.id === selectedId;
            return (
              <div
                key={d.id}
                className="flex flex-col rounded-xl border border-[#E5E8EF] bg-white p-5 transition-shadow hover:shadow-[0_8px_24px_rgba(17,21,28,0.06)]"
              >
                <div className="mb-4 flex h-60 items-center justify-center rounded-lg bg-[#F7F8FB]">
                  <img src={d.image} alt={d.name} />
                </div>

                <h3
                  className="mb-2 text-[15px] font-semibold leading-snug text-[#11151C]"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {d.model}, {d.name.replace(/^Pralka [^,]+, /, "")}
                </h3>

                <div
                  className="mb-3 space-y-1 text-[12.5px] leading-relaxed text-[#6B7280]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <p>
                    Pojemność (kg):{" "}
                    <span className="font-semibold text-[#11151C]">
                      {d.capacity}
                    </span>
                  </p>
                  <p>
                    Wymiary (SxGxW):{" "}
                    <span className="font-semibold text-[#11151C]">
                      {d.dimensions.width} x {d.dimensions.depth} x{" "}
                      {d.dimensions.height} cm
                    </span>
                  </p>
                  <p>
                    Funkcje:{" "}
                    <span className="font-semibold text-[#11151C]">
                      {d.functions.join(", ")}
                    </span>
                  </p>
                </div>

                <div className="mb-3 flex items-center gap-2">
                  <span
                    className="text-[12.5px] text-[#6B7280]"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Klasa energetyczna
                  </span>
                  <EnergyBadge energyClass={d.energyClass} />
                </div>

                <p
                  className="mb-2 text-[11.5px] text-[#9AA2AF]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  Cena obowiązuje:{" "}
                  {d.priceValidFrom.split("-").reverse().join(".")} –{" "}
                  {d.priceValidTo.split("-").reverse().join(".")}
                </p>

                <div
                  className="mb-1 flex items-baseline gap-1"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  <span className="text-[26px] font-semibold text-[#11151C]">
                    {Math.trunc(d.price)}
                  </span>
                  <span className="text-[13px] font-semibold text-[#11151C]">
                    {(d.price % 1).toFixed(2).slice(2)} zł
                  </span>
                </div>
                <p
                  className="mb-4 text-[12.5px] text-[#6B7280]"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {d.installment.amount.toFixed(2).replace(".", ",")} zł x{" "}
                  {d.installment.months} rat
                </p>

                <button
                  type="button"
                  onClick={() => setSelectedId(d.id)}
                  className={`mt-auto rounded-full py-2.5 text-[13px] font-semibold tracking-wide transition-colors ${
                    isSelected
                      ? "bg-[#11151C] text-white"
                      : "bg-[#1447E6] text-white hover:bg-[#0F3DB8]"
                  }`}
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {isSelected ? "WYBRANE" : "WYBIERZ"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
