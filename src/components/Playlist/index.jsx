import Track from "./Track";
import { useEffect, useState } from "react";
import { getPlaylist } from "@/utils";

const Playlist = ({ name, columns }) => {
  const [playlist, setPlaylist] = useState(null);
  useEffect(() => {
    getPlaylist(name, "date", "desc")
      .then((data) => {
        setPlaylist(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-y-auto h-full xl:p-4">
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
