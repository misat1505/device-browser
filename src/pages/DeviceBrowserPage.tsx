import DeviceBrowser from "../components/DeviceBrowser";
import { devices } from "../data/devices";

export function DeviceBrowserPage() {
  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] -translate-y-0.5">
      <div className="h-16.5 bg-white">
        <h1
          className="text-center"
          style={{
            fontFamily: "SamsungOne",
            fontStyle: "normal",
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "56px",
            color: "#000000",
          }}
        >
          Wybierz urządzenie
        </h1>
      </div>

      <DeviceBrowser devices={devices} />

      <div className="h-40.5 bg-white"></div>
    </div>
  );
}
