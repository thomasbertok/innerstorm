import Track from "./Track";
import { useEffect, useState } from "react";
import { getPlaylist } from "@/utils";

const Playlist = ({ name, columns, orderBy = ["title", "asc"] }) => {
  const [playlist, setPlaylist] = useState(null);
  useEffect(() => {
    getPlaylist(name, orderBy[0], orderBy[1])
      .then((data) => {
        setPlaylist(data);
      })
      .catch((err) => console.error(err));
  }, []);

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

export default Playlist;
