import "@/styles/App.css";
import FullPage from "@/components/fullpage/FullPage";
import Slide from "@/components/fullpage/Slide";

import Home from "@/sections/Home";
import Tracks from "@/sections/Tracks";
import { useState } from "react";

function App() {
  const [active, setActive] = useState(0);

  const isActive = (index) => {
    return active === index;
  };

  return (
    <main className="app">
      <FullPage controls duration={500} activePage={active} setActivePage={setActive}>
        <Slide title="Home" activestate={isActive(0)}>
          <Home setActivePage={setActive} />
        </Slide>
        <Slide title="Tracks" activestate={isActive(1)}>
          <Tracks />
        </Slide>
      </FullPage>
    </main>
  );
}

export default App;
