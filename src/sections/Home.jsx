import { useContext } from "react";
import { useAppContext } from "@/context/AppContext";

import { Youtube, SoundCloud, Facebook, Instagram, Music } from "@/assets/icons";
import LogoType from "@/components/LogoType";

const Home = () => {
  const { setActivePage } = useAppContext();

  const handlePageClick = (ev, index) => {
    ev.preventDefault();
    setActivePage(index);
  };
  return (
    <div className="screen screen-1 page-home flex flex-col items-center gap-20">
      <div className="logo">
        <LogoType fileName="icon-logo.svg" />
      </div>

      <div className="links flex gap-6 items-center">
        <a href="https://soundcloud.com/innerstorm" target="_blank" className="icon soundcloud w-16 h-16">
          <SoundCloud />
        </a>
        <a href="https://www.youtube.com/innerstorm" target="_blank" className="icon youtube w-16 h-16">
          <Youtube />
        </a>

        <a
          href="#"
          target="_blank"
          className="icon music w-28 h-28"
          title="Music"
          onClick={(ev) => handlePageClick(ev, 1)}>
          <Music />
        </a>

        <a href="https://www.facebook.com/innerstorm" target="_blank" className="icon facebook w-16 h-16">
          <Facebook />
        </a>
        <a href="https://www.instagram.com/innerstormmusic/" target="_blank" className="icon instagram w-16 h-16">
          <Instagram />
        </a>
      </div>
    </div>
  );
};
export default Home;
