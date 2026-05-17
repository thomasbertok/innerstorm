import { useEffect, useState } from "react";
import { getPlaylist } from "@/utils";
import CalendarTrack from "./CalendarTrack";
import PropTypes from "prop-types";

const CalendarPlaylist = ({ playlistName }) => {
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    getPlaylist(playlistName)
      .then((data) => {
        setPlaylist(data);
      })
      .catch((err) => console.error(err));
  }, [playlistName]);

  return (
    <div className="calendar-playlist w-full h-full grid-flow-row grid-cols-2 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 5xl:grid-cols-6">
      {playlist && playlist.length > 0 && playlist.map((track) => <CalendarTrack key={track.id} track={track} />)}
    </div>
  );
};

CalendarPlaylist.propTypes = {
  playlistName: PropTypes.string.isRequired,
};

export default CalendarPlaylist;
