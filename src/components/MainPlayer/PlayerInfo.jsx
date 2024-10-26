import React from "react";
import { usePlayerContext } from "@/context/PlayerContext";

const PlayerInfo = () => {
  const { currentTrack, currentTrackCover } = usePlayerContext();
  return (
    <div className="player-info flex items-center justify-start gap-4 pl-2">
      <div className="player-cover object-contain">
        {currentTrack && (
          <img
            className="rounded-lg w-20"
            src={currentTrackCover}
            alt={currentTrack.title}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "music/cover/default.jpg";
            }}
            loading="lazy"
          />
        )}
      </div>
      {currentTrack && (
        <div className="player-titles flex flex-col gap-0">
          <div className="player-title  text-zinc-200 font-extrabold text-nowrap">{currentTrack?.title}</div>
          <div className="player-artist text-zinc-300 text-sm font-medium text-nowrap">{currentTrack?.artist}</div>
          <div className="player-artist text-zinc-400 text-sm font-light text-nowrap">
            {currentTrack?.genre} {currentTrack?.year !== "Unknown" && ` / ${currentTrack.year}`}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerInfo;
