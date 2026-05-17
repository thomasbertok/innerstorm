import { Play, Pause } from "lucide-react";
import { usePlayerContext } from "@/context/PlayerContext";
import PropTypes from "prop-types";

const CalendarTrack = ({ track }) => {
  const { currentPlaylist, playTrack, pauseTrack, trackIsPlaying } = usePlayerContext();

  const handlePlayPauseTrack = (track) => {
    if (!currentPlaylist) return;
    trackIsPlaying(track.id) ? pauseTrack() : playTrack(currentPlaylist, track);
  };

  return (
    <div
      id={`month-${track.id}`}
      className={`calendar-month ${trackIsPlaying(track.id) ? "selected" : ""}`}
      onClick={() => handlePlayPauseTrack(track)}>
      <div className="month-card flex items-center gap-2 flex-col glass">
        <div className="rounded-xl overflow-hidden">
          <img src={`${import.meta.env.VITE_COVERS_PATH}${track.slug}.jpg`} alt={track.title} />
        </div>
        <div className="titles flex flex-col gap-1 items-center">
          <div className="title text-zinc-100 font-bold">{track.title}</div>
          <div className="genre text-zinc-200">{track.genre}</div>
        </div>
        <div className="icons">
          {trackIsPlaying(track.id) ? (
            <Pause size={24} className="text-zinc-300" />
          ) : (
            <Play size={24} className="text-zinc-300" />
          )}
        </div>
      </div>
    </div>
  );
};

CalendarTrack.propTypes = {
  track: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default CalendarTrack;
