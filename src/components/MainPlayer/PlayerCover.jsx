import { useState } from "react";
import { usePlayerContext } from "@/context/PlayerContext";

const PlayerCover = ({ cover }) => {
  const { showCover, setShowCover } = usePlayerContext();

  return (
    <img
      className="rounded-lg w-16 h-16 cursor-pointer"
      onClick={() => setShowCover(true)}
      src={cover}
      alt=""
      onError={(e) => {
        e.target.onError = null;
        e.target.src = "music/cover/default.jpg";
      }}
      loading="lazy"
    />
  );
};

export default PlayerCover;
