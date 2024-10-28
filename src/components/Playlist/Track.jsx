import { formatTime } from "@/utils";
import { usePlayerContext } from "@/context/PlayerContext";
import { Play, Pause } from "lucide-react";

const Track = ({ trackData, index, playlistName, columns }) => {
  const { currentTrack, playTrack, pauseTrack, trackIsPlaying, setIsPlaying } = usePlayerContext();

  const handlePlaypauseTrack = (track) => {
    console.log("currentTrack", currentTrack);
    if (currentTrack) {
      trackIsPlaying(track.id) ? pauseTrack() : playTrack(track);
    }
  };

  return (
    <div
      className={`playlist-track ${trackIsPlaying(trackData.id) ? "track-is-playing" : ""}`}
      onClick={() => handlePlaypauseTrack(trackData)}>
      {columns.includes("cover") && (
        <div className="playlist-track-cover">
          <button className="button flex items-center justify-center">
            {trackIsPlaying(trackData.id) ? <Pause /> : <Play />}
          </button>

          <img
            src={`${import.meta.env.VITE_COVERS_PATH}${trackData.slug}.jpg`}
            alt={trackData.title}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "music/cover/default.jpg";
            }}
            loading="lazy"
          />
        </div>
      )}
      <div className="playlist-track-index">{index}</div>
      {columns.includes("title") && <div className="playlist-track-title">{trackData.title}</div>}
      {columns.includes("artist") && <div className="playlist-track-artist">{trackData.artist}</div>}
      {columns.includes("genre") && <div className="playlist-track-genre">{trackData.genre}</div>}
      {columns.includes("year") && (
        <div className="playlist-track-year">{trackData.year !== "Unknown" && trackData.year}</div>
      )}
      {columns.includes("length") && <div className="playlist-track-length">{formatTime(trackData.length)}</div>}
    </div>
  );
};

export default Track;
