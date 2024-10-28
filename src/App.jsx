import ReactGA from "react-ga4";
import { AppContextProvider } from "@/context/AppContext";
import { PlayerContextProvider } from "./context/PlayerContext";
import Sections from "@/sections/Sections";
import "@/styles/App.css";

const TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
ReactGA.initialize(TRACKING_ID);

function App() {
  return (
    <AppContextProvider>
      <PlayerContextProvider>
        <Sections />
      </PlayerContextProvider>
    </AppContextProvider>
  );
}

export default App;
