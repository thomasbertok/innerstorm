import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { getPlaylist } from "@/utils";
import Track from "./Track";

const Playlist = ({ name, columns, orderBy = ["title", "asc"] }) => {
  const [playlist, setPlaylist] = useState(null);
  useEffect(() => {
    getPlaylist(name, orderBy[0], orderBy[1])
      .then((data) => {
        setPlaylist(data);
      })
      .catch((err) => console.error(err));
  }, [name, orderBy]);

  return (
    <div className="overflow-y-auto h-full md:p-4">
      <div className={`playlist`}>
        {playlist &&
          playlist.length > 0 &&
          playlist.map((track, index) => (
            <Track key={index} index={index + 1} playlist={playlist} trackData={track} columns={columns} />
          ))}
      </div>
    </div>
  );
};

Playlist.propTypes = {
  name: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  orderBy: PropTypes.arrayOf(PropTypes.string),
};

export default Playlist;
