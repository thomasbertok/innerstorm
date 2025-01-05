import { usePlayerContext } from "@/context/PlayerContext";
import { Play, Pause, ChevronFirst, ChevronLast } from "lucide-react";

const PlayerControls = () => {
  const { isPlaying, setIsPlaying, currentTrack, playlist, clickNextTrack, clickPrevTrack, isRepeat } =
    usePlayerContext();

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-controls flex items-center justify-center gap-2">
      {/* PREVIOUS */}
      <button type="button" name="play-previous">
        <ChevronFirst
          size={28}
          onClick={clickPrevTrack}
          className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
          disabled={playlist && currentTrack === playlist[0] && isRepeat !== 2}
        />
        <span className="hidden">previous</span>
      </button>

      {/* PLAY/PAUSE */}
      <button
        name="play-pause"
        type="button"
        className="group button w-12 h-12 flex rounded-full items-center justify-center hover:bg-zinc-100/80 hover:border-transparent transition-colors"
        onClick={handlePlayButtonClick}>
        {isPlaying ? (
          <Pause size={24} className="text-zinc-300 dark:text-zinc-400 group-hover:text-zinc-600" />
        ) : (
          <Play
            size={24}
            className="transform translate-x-[1px] text-zinc-300 dark:text-zinc-400 group-hover:text-zinc-600"
          />
        )}
        <span className="hidden">{isPlaying ? "pause" : "play"}</span>
      </button>

      {/* NEXT */}
      <button className="disabled:text-zinc-400" onClick={clickNextTrack} name="play-next" type="button">
        <ChevronLast
          size={28}
          className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
          disabled={playlist && currentTrack === playlist[playlist.length - 1] && isRepeat !== 2}
        />
        <span className="hidden">next</span>
      </button>
    </div>
  );
};

export default PlayerControls;
