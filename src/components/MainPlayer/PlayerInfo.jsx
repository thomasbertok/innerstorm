import React from "react";
import PlayerCover from "./PlayerCover";
import { usePlayerContext } from "@/context/PlayerContext";

const PlayerInfo = () => {
  const { currentTrack, currentTrackCover } = usePlayerContext();
  return (
    <>
      <div className="player-cover">{currentTrack && <PlayerCover cover={currentTrackCover} />}</div>

      <div className="player-titles flex flex-col gap-0">
        {currentTrack && (
          <>
            <div className="player-title  text-zinc-200 font-extrabold text-nowrap">{currentTrack?.title}</div>
            {/* <div className="player-artist text-zinc-300 md:text-sm font-medium text-nowrap">{currentTrack?.artist}</div> */}
            <div className="player-genre text-zinc-400 text-sm font-light text-nowrap">
              {currentTrack?.genre} {currentTrack?.year !== "Unknown" && ` / ${currentTrack.year}`}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PlayerInfo;
