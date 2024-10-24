import FullPage from "@/components/fullpage/FullPage";
import Slide from "@/components/fullpage/Slide";
import { useAppContext } from "@/context/AppContext";

import Home from "@/sections/Home";
import Player from "@/sections/Player";
import TextContent from "@/sections/TextContent";

const FullPageContainer = () => {
  const { colorScheme, activePage, setActivePage, isActivePage } = useAppContext();

  return (
    <main className={`app ${colorScheme}`}>
      <FullPage controls duration={400} activePage={activePage} setActivePage={setActivePage}>
        <Slide title="Tracks" activestate={isActivePage(1)}>
          <Player />
        </Slide>
        <Slide title="Home" activestate={isActivePage(0)}>
          <Home />
        </Slide>
        {/* <Slide title="Content" activestate={isActivePage(2)}>
          <TextContent />
        </Slide> */}
      </FullPage>
    </main>
  );
};

export default FullPageContainer;
