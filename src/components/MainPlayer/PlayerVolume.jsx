import { VolumeX, Volume1, Volume2, Volume } from "lucide-react";
import { useState } from "react";
import { usePlayerContext } from "@/context/PlayerContext";

const Speaker = ({ value }) => {
  const options = {
    className: "player-volume-knob",
    size: 24,
  };

  let speaker = <VolumeX {...options} />;

  if (value > 0.05 && value <= 0.33) speaker = <Volume {...options} />;
  if (value > 0.33) speaker = <Volume1 {...options} />;
  if (value > 0.66) speaker = <Volume2 {...options} />;

  return speaker;
};

const PlayerVolume = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { volume, setVolume } = usePlayerContext();

  return (
    <div className="player-volume">
      <div className="volume-knobs" onClick={() => setIsVisible(!isVisible)}>
        <Speaker value={volume} />
      </div>

      <div className={`player-volume-slider ${isVisible ? "flex" : "hidden"}`}>
        <input
          className="player-volume-range"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PlayerVolume;
