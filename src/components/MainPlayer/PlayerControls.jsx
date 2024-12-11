import React from "react";

import { usePlayerContext } from "@/context/PlayerContext";

import { Play, Pause, ChevronFirst, ChevronLast, Shuffle, Repeat, Repeat1 } from "lucide-react";

const PlayerControls = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentTrack,
    playlist,
    isShuffled,
    setIsShuffled,
    clickNextTrack,
    clickPrevTrack,
    isRepeat,
  } = usePlayerContext();

  const handlePlayButtonClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="player-controls flex items-center justify-center gap-2">
      {/* PREVIOUS */}
      <button className="">
        <ChevronFirst
          size={28}
          onClick={clickPrevTrack}
          className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
          disabled={playlist && currentTrack === playlist[0] && isRepeat !== 2}
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
            className="transform translate-x-[1px] text-zinc-300 dark:text-zinc-400 group-hover:text-zinc-600"
          />
        )}
      </button>

      {/* NEXT */}
      <button className="disabled:text-zinc-400" onClick={clickNextTrack}>
        <ChevronLast
          size={28}
          className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
          disabled={playlist && currentTrack === playlist[playlist.length - 1] && isRepeat !== 2}
        />
      </button>

      {/* SHUFFLE */}
      {/* <button
        onClick={() => {
          setIsShuffled(!isShuffled);
        }}>
        <Shuffle size={20} className={isShuffled ? "text-zinc-100" : "text-zinc-400"} />
      </button> */}

      {/* REPEAT */}
      {/* <button className="" onClick={() => setIsRepeat((isRepeat + 1) % 3)}>
        {isRepeat === 0 ? (
          <Repeat size={22} className="text-zinc-400 hover:text-zinc-100" />
        ) : isRepeat === 1 ? (
          <Repeat1 size={22} />
        ) : (
          <Repeat size={22} className="text-zinc-300" />
        )}
      </button> */}
    </div>
  );
};

export default PlayerControls;
