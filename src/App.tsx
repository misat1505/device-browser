import { devices } from "./data/devices";

function App() {
  return (
    <div>
      {devices.map((device) => (
        <div key={device.id}>{device.name}</div>
      ))}
    </div>
  );
}

export default App;
