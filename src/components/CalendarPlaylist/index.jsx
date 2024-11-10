import CalendarTrack from "./CalendarTrack";
import { usePlayerContext } from "@/context/PlayerContext";

const CalendarPlaylist = ({ playlistName }) => {
  const { playlists } = usePlayerContext();
  return (
    <div className="calendar-playlist w-full h-full grid-flow-row grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 5xl:grid-cols-6">
      {playlists &&
        playlists[playlistName] &&
        playlists[playlistName].map((track, idx) => <CalendarTrack key={track.id} index={idx} track={track} />)}
    </div>
  );
};

export default CalendarPlaylist;
