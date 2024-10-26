import { AppContextProvider } from "@/context/AppContext";
import { PlayerContextProvider } from "./context/PlayerContext";
import Sections from "@/sections/Sections";
import "@/styles/App.css";

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
