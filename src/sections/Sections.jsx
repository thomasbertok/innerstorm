import FullPage from "@/components/FullPage/FullPage";
import Slide from "@/components/FullPage/Slide";
import { useAppContext } from "@/context/AppContext";

import Home from "@/sections/Home";
import Tracks from "@/sections/Tracks";
import Mixes from "@/sections/Mixes";
import CalendarMixes from "@/sections/Calendar";
import About from "@/sections/About";

import MainPlayer from "@/components/MainPlayer";

const Sections = () => {
  const { colorScheme, activePage, setActivePage, isActivePage, menuOpen, setMenuOpen } = useAppContext();

  return (
    <main className={`app ${colorScheme} active-slide-${activePage}`}>
      <FullPage
        controls
        duration={350}
        activePage={activePage}
        setActivePage={setActivePage}
        open={menuOpen}
        setOpen={setMenuOpen}
        noScrollClass=".no-scroll">
        <Slide title="Home" activestate={isActivePage(0)}>
          <Home />
        </Slide>
        <Slide title="Tracks" activestate={isActivePage(1)}>
          <Tracks />
        </Slide>
        <Slide title="Mixes" activestate={isActivePage(2)}>
          <Mixes />
        </Slide>
        <Slide title="Mixes" activestate={isActivePage(3)}>
          <CalendarMixes />
        </Slide>
        <Slide title="About" activestate={isActivePage(4)}>
          <About />
        </Slide>
      </FullPage>

      <MainPlayer />
    </main>
  );
};

export default Sections;
