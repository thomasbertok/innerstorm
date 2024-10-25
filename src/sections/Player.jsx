import Section from "@/components/Section";
import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioPlaylist from "@/components/AudioPlayer/AudioPlaylist";
import Polygons from "@/assets/backgrounds/poly.jpg";

const Player = () => {
  return (
    <Section sectionName="section-2" withLogo wallpaper={Polygons}>
      <div className="glass">
        <div className="player-grid">
          <AudioPlayer />
          <AudioPlaylist />
        </div>
      </div>
    </Section>
  );
};

export default Player;
