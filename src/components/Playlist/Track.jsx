import { formatTime } from "@/utils";
import { usePlayerContext } from "@/context/PlayerContext";
import { Play, Pause } from "lucide-react";
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

  /**
   * if the clicked track is playing, pause it,
   * else play the track, and bring the playlist with it to update
   */
  const handlePlaypauseTrack = (track) => {
    trackIsPlaying(track.id) ? pauseTrack() : playTrack(playlist, track);
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
          <TrackCover trackData={trackData} />
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
