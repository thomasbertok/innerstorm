import PlayerInfo from "./PlayerInfo";
import PlayerControls from "./PlayerControls";
import PlayerVolume from "./PlayerVolume";
import PlayerWaveSurfer from "./PlayerWaveSurfer";

const MainPlayer = () => {
  return (
    <div className="main-player glass w-9/12 player-hidden">
      <PlayerInfo />
      <PlayerControls />
      <PlayerWaveSurfer />
      <PlayerVolume />
    </div>
  );
};

export default MainPlayer;
