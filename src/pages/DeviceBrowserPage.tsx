import DeviceBrowser from "../components/DeviceBrowser";
import { DeviceBrowserPageHeader } from "../components/DeviceBrowserPageHeader";
import { devices } from "../data/devices";

export function DeviceBrowserPage() {
  // The devices are imported directly from a file, because there is no backend.
  // If they were fetched from external API, there would have been an API call,
  // for example:
  //
  // const { data: devices, isPending, isError } = useQuery({
  //   queryKey: ["devices"],
  //   queryFn: getDevices
  // });
  //
  // isPending and isError states would be displayed accordingly.

  return (
    <div className="min-h-screen w-full bg-[#F7F8FB] -translate-y-0.5">
      <DeviceBrowserPageHeader />

      <DeviceBrowser devices={devices} />

      <div className="h-40.5 bg-white"></div>
    </div>
  );
}
