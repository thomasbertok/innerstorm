import Polygons from "@/assets/backgrounds/poly.jpg";
import Section from "@/components/Section";
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
    <Section sectionName="section-1" wallpaper={Polygons}>
      <div className="section-content section-home">
        <LogoType />
        <div className="homepage-social-links flex gap-6 items-center no-scroll">
          <a href="https://soundcloud.com/innerstorm" target="_blank" className="icon tooltip soundcloud icon-small">
            <div className="tooltip-content">Have a listen on my Soundcloud!</div>
            <SoundCloud />
          </a>
          <a href="https://www.youtube.com/1nn3rst0rm" target="_blank" className="icon tooltip youtube icon-small">
            <div className="tooltip-content">Check out my Youtube channel!</div>
            <Youtube />
          </a>

          <a
            href="#"
            target="_blank"
            className="icon tooltip smusic icon-big"
            title="Click to listen to some music!"
            onClick={(ev) => handlePageClick(ev, 1)}>
            <div className="tooltip-content">
              <p>Click to listen!</p>
            </div>
            <Music />
          </a>

          <a href="https://www.facebook.com/1nn3rst0rm" target="_blank" className="icon tooltip sfacebook icon-small">
            <div className="tooltip-content">Follow me on Facebook!</div>
            <Facebook />
          </a>
          <a
            href="https://www.instagram.com/innerstormmusic/"
            target="_blank"
            className="icon tooltip instagram icon-small">
            <div className="tooltip-content">Follow me on Instagram!</div>
            <Instagram />
          </a>
        </div>
      </div>
    </Section>
  );
};
export default Home;
