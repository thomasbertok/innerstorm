import { useContext } from "react";
import { useAppContext } from "@/context/AppContext";
import { MdPlayCircleOutline } from "react-icons/md";
import { IoMdPlay, IoMdPause } from "react-icons/io";

const AudioPlaylist = () => {
  const { currentTrack, setCurrentTrack, playlist, play, playTrack, trackIsPlaying, loadingPlaylist } = useAppContext();
  if (!playlist) return null;

  // alphabeticval ordering of tracks by name
  // TODO: sort by date descending | needs additional db.json data
  const orderedPlaylist = playlist.sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <div className="grid-playlist border-l border-zinc-600/50 dark:border-zinc-800 px-5 overflow-y-auto">
      {loadingPlaylist && <div className="text-sm text-zinc-300 dark:text-zinc-600">Loading...</div>}
      <ul className="">
        {/* {[...Array(20)].map((_, i) => (
          <li key={i} className="user-select-none">
            <span
              title="Double click to play"
              onDoubleClick={() => {
                playTrack(track);
              }}
              className="flex gap-4 items-center hover:bg-zinc-800/60 rounded-tl-xl rounded-bl-xl p-2 cursor-pointer">
              <div className="text-sm text-zinc-300 dark:text-zinc-600 w-[1.5rem] text-right flex items-center justify-center">
                {trackIsPlaying(i) ? <IoMdPause /> : <span>{i}</span>}
              </div>
              <div className="flex-1">lorem ispum {i}</div>
            </span>
          </li>
        ))} */}

        {orderedPlaylist.map((track) => (
          <li key={track.id} className="user-select-none">
            <span
              title="Double click to play"
              onDoubleClick={() => {
                playTrack(track);
              }}
              className="flex gap-4 items-center hover:bg-zinc-800/60  rounded-xl py-2 px-4 cursor-pointer">
              <div className="text-sm text-zinc-400 dark:text-zinc-500 w-[1.5rem] text-right flex items-center justify-center">
                {trackIsPlaying(track.id) ? <IoMdPause /> : <span>{track.id}</span>}
              </div>
              <div className="flex-1 text-md text-zinc-300 dark:text-zinc-300 hover:text-zinc-100">{track.name}</div>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlaylist;
