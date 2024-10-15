import "@/styles/App.css";
import { Theme } from "@radix-ui/themes";
import FullPage from "@/components/fullpage/FullPage";
import Slide from "@/components/fullpage/Slide";

import Home from "@/sections/Home";
import Tracks from "@/sections/Tracks";
import Player from "@/sections/Player";
import { useState } from "react";

function App() {
  const [active, setActive] = useState(2);

  const isActive = (index) => {
    return active === index;
  };

  return (
    <Theme>
      <main className="app">
        <FullPage controls duration={400} activePage={active} setActivePage={setActive}>
          <Slide title="Home" activestate={isActive(0)}>
            <Home setActivePage={setActive} />
          </Slide>
          <Slide title="Tracks" activestate={isActive(1)}>
            <Tracks />
          </Slide>
          <Slide title="Tracks" activestate={isActive(2)}>
            <Player />
          </Slide>
        </FullPage>
      </main>
    </Theme>
  );
}

export default App;
