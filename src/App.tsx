import DevicesDisplay from "./components/DevicesDisplay";
import { devices } from "./data/devices";

function App() {
  return <DevicesDisplay devices={devices} />;
}

export default App;
