import Track from "./Track";
import { usePlayerContext } from "@/context/PlayerContext";

const Playlist = ({ playlistName, columns }) => {
  const { playlists } = usePlayerContext();

  return (
    <div className={`playlist`}>
      {playlists &&
        playlists[playlistName] &&
        playlists[playlistName].map((track, index) => (
          <Track key={index} index={index + 1} playlistName={playlistName} trackData={track} columns={columns} />
        ))}
    </div>
  );
};

export default Playlist;
