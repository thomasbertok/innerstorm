import { usePlayerContext } from "@/context/PlayerContext";

const PlayerCover = ({ cover }) => {
  const { setShowCover } = usePlayerContext();

  return (
    <img
      className="rounded lg:rounded-lg lg:w-16 lg:h-16 cursor-pointer"
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
