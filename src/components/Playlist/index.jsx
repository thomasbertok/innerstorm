import { useState } from "react";
import Track from "./Track";
import { usePlayerContext } from "@/context/PlayerContext";

const Playlist = ({ playlistName, columns }) => {
  const [loading, setLoading] = useState(false);
  const { playlist } = usePlayerContext();

  if (!playlist) return null;

  return (
    <div className="playlist">
      {loading && <div>Loading...</div>}
      {playlist &&
        playlist.map((track, index) => <Track key={index} index={index + 1} trackData={track} columns={columns} />)}
    </div>
  );
};

export default Playlist;
