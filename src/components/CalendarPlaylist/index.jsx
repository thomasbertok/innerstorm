import CalendarTrack from "./CalendarTrack";
import { usePlayerContext } from "@/context/PlayerContext";
import { useEffect, useState } from "react";
import { getPlaylist } from "@/utils";

const CalendarPlaylist = ({ playlistName }) => {
  const { playlists } = usePlayerContext();
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    getPlaylist(playlistName)
      .then((data) => {
        setPlaylist(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="calendar-playlist w-full h-full grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 5xl:grid-cols-6">
      {playlist &&
        playlist.length > 0 &&
        playlist.map((track, idx) => <CalendarTrack key={track.id} index={idx} track={track} />)}
    </div>
  );
};

export default CalendarPlaylist;
