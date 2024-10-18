import FullPage from "@/components/fullpage/FullPage";
import Slide from "@/components/fullpage/Slide";
import { useAppContext } from "@/context/AppContext";
import Home from "@/sections/Home";
import Tracks from "@/sections/Tracks";
import Player from "@/sections/Player";

const FullPageContainer = () => {
  const { colorScheme, activePage, setActivePage, isActive } = useAppContext();

  return (
    <main className={`app ${colorScheme}`}>
      <FullPage controls duration={400} activePage={activePage} setActivePage={setActivePage}>
        <Slide title="Tracks" activestate={isActive(0)}>
          <Player />
        </Slide>
        <Slide title="Home" activestate={isActive(1)}>
          <Home />
        </Slide>
        <Slide title="Tracks" activestate={isActive(2)}>
          <Tracks />
        </Slide>
      </FullPage>
    </main>
  );
};

export default FullPageContainer;
