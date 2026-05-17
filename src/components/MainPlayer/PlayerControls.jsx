import React from "react";
import { usePlayerContext } from "@/context/PlayerContext";
import { Play, Pause, ChevronFirst, ChevronLast } from "lucide-react";

const PlayerControls = () => {
  const { isPlaying, setIsPlaying, currentTrack, currentPlaylist, clickNextTrack, clickPrevTrack, isRepeat } =
    usePlayerContext();

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-controls flex items-center justify-center gap-2">
      {/* PREVIOUS */}
      <button className="" disabled={currentPlaylist && currentTrack === currentPlaylist[0] && isRepeat !== 2}>
        <ChevronFirst
          size={28}
          onClick={clickPrevTrack}
          className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
        />
      </button>

      {/* PLAY/PAUSE */}
      <button
        className="group button w-12 h-12 flex rounded-full items-center justify-center hover:bg-zinc-100/80 hover:border-transparent transition-colors"
        onClick={handlePlayButtonClick}>
        {isPlaying ? (
          <Pause size={24} className="text-zinc-300 dark:text-zinc-400 group-hover:text-zinc-600" />
        ) : (
          <Play
            size={24}
            className="transform translate-x-px text-zinc-300 dark:text-zinc-400 group-hover:text-zinc-600"
          />
        )}
      </button>

      {/* NEXT */}
      <button
        className="disabled:text-zinc-400"
        onClick={clickNextTrack}
        disabled={currentPlaylist && currentTrack === currentPlaylist[currentPlaylist.length - 1] && isRepeat !== 2}>
        <ChevronLast
          size={28}
          className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
        />
      </button>
    </div>
  );
};

export default PlayerControls;
