import { useState } from "react";
import { formatTime } from "@/utils";
import { usePlayerContext } from "@/context/PlayerContext";
import { Play, Pause, CloudDownload } from "lucide-react";
import TrackCover from "./TrackCover";

/**
 * One track component in the playlist
 *
 * trackData: track object
 * index: track's index in the playlist, ordered by playlist order
 * playlist: playlist of the track, so we can update the current playlist
 * columns: columns to display
 */

const Track = ({ trackData, index, playlist, columns }) => {
  const { playTrack, pauseTrack, trackIsPlaying } = usePlayerContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * if the clicked track is playing, pause it,
   * else play the track, and bring the playlist with it to update
   */
  const handlePlaypauseTrack = (track) => {
    trackIsPlaying(track.id) ? pauseTrack() : playTrack(playlist, track);
  };

  const handleContextMenuClick = (e) => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className={`playlist-track group ${trackIsPlaying(trackData.id) ? "track-is-playing" : ""}`}>
      {columns.includes("cover") && (
        <div className="playlist-track-cover" onClick={() => handlePlaypauseTrack(trackData)}>
          <button className="button flex items-center justify-center">
            {trackIsPlaying(trackData.id) ? <Pause /> : <Play />}
          </button>
          <TrackCover trackData={trackData} />
        </div>
      )}
      <div className="playlist-track-index">{index}</div>
      {columns.includes("title") && <div className="playlist-track-title">{trackData.title}</div>}
      {columns.includes("artist") && <div className="playlist-track-artist">{trackData.artist}</div>}

      <div className="playlist-track-download">
        <a
          download
          href={`${import.meta.env.VITE_FILES_URL}${trackData.filename}`}
          title="Click to download track"
          className="download-button button w-8 h-8 text-zinc-500 group-hover:text-zinc-100 flex items-center justify-center lg:invisible lg:group-hover:visible rounded-full hover:bg-zinc-900">
          <CloudDownload size={18} />
        </a>
      </div>

      {columns.includes("genre") && <div className="playlist-track-genre">{trackData.genre}</div>}
      {columns.includes("year") && (
        <div className="playlist-track-year">{trackData.year !== "Unknown" && trackData.year}</div>
      )}
      {columns.includes("length") && <div className="playlist-track-length">{formatTime(trackData.length)}</div>}
    </div>
  );
};

export default Track;
