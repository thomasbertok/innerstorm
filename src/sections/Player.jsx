import AudioPlayer from "@/components/AudioPlayer/AudioPlayer";
import AudioPlaylist from "@/components/AudioPlayer/AudioPlaylist";
import Logo from "@/components/Logo";

const Player = () => {
  return (
    <div className="screen screen-3 relative z-10">
      <Logo className="screen-logo" />
      <div className="glass screen-container p-4 md:p-10">
        <div className="player-grid">
          <AudioPlayer />
          <AudioPlaylist />
        </div>
      </div>
    </div>
  );
};

export default Player;
