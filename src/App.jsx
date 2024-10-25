import { AppContextProvider } from "@/context/AppContext";
import Sections from "@/sections/Sections";
import "@/styles/App.css";

function App() {
  return (
    <AppContextProvider>
      <Sections />
    </AppContextProvider>
  );
}

export default App;
