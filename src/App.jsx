import { AppContextProvider } from "@/context/AppContext";
import FullPageContainer from "@/components/FullPageContainer";
import "@/styles/App.css";

function App() {
  return (
    <AppContextProvider>
      <FullPageContainer />
    </AppContextProvider>
  );
}

export default App;
