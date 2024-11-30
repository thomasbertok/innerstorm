import PlayerInfo from "./PlayerInfo";
import PlayerControls from "./PlayerControls";
import PlayerVolume from "./PlayerVolume";
import PlayerWaveSurfer from "./PlayerWaveSurfer";
import { usePlayerContext } from "@/context/PlayerContext";

const MainPlayer = () => {
  const { currentTrack } = usePlayerContext();
  return (
    <div className={`main-player glass w-9/12 ${!currentTrack && "out-of-screen"}`}>
      <PlayerInfo />
      <PlayerControls />
      <PlayerWaveSurfer />
      <PlayerVolume />
    </div>
  );
};

export default MainPlayer;
