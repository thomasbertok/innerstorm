import Section from "@/components/Section";

import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioPlaylist from "@/components/AudioPlayer/AudioPlaylist";
import Logo from "@/components/Logo";
import Polygons from "@/assets/backgrounds/poly.jpg";

const Player = () => {
  return (
    <Section sectionName="section-2" withLogo glass wallpaper={Polygons}>
      <div className="player-grid">
        <AudioPlayer />
        <AudioPlaylist />
      </div>
    </Section>
  );

  // return (
  //   <div className="screen screen-2">
  //     <Logo className="screen-logo" />
  //     <div className="glass screen-content">
  //       <div className="player-grid">
  //         <AudioPlayer />
  //         <AudioPlaylist />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Player;
