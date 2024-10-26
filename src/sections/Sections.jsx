import FullPage from "@/components/fullpage/FullPage";
import Slide from "@/components/fullpage/Slide";
import { useAppContext } from "@/context/AppContext";

import Home from "@/sections/Home";
import Tracks from "@/sections/Tracks";
import About from "@/sections/About";

import MainPlayer from "@/components/MainPlayer";

const Sections = () => {
  const { colorScheme, activePage, setActivePage, isActivePage, menuOpen, setMenuOpen } = useAppContext();

  return (
    <main className={`app ${colorScheme}`}>
      <FullPage
        controls
        duration={400}
        activePage={activePage}
        setActivePage={setActivePage}
        open={menuOpen}
        setOpen={setMenuOpen}>
        <Slide title="Tracks" activestate={isActivePage(1)}>
          <Tracks />
        </Slide>
        <Slide title="Home" activestate={isActivePage(0)}>
          <Home />
        </Slide>
        <Slide title="About" activestate={isActivePage(2)}>
          <About />
        </Slide>
      </FullPage>

      <MainPlayer />
    </main>
  );
};

export default Sections;
