import { useContext } from "react";
import { useAppContext } from "@/context/AppContext";
import { MdPlayCircleOutline } from "react-icons/md";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";

const AudioPlaylist = () => {
  const { currentTrack, setCurrentTrack, playlist, play, playTrack, trackIsPlaying, loadingPlaylist } = useAppContext();
  if (!playlist) return null;

  // alphabeticval ordering of tracks by name
  // TODO: sort by date descending | needs additional db.json data
  const orderedPlaylist = playlist.sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <div className="grid-playlist border-l border-zinc-600/50 dark:border-zinc-800 px-4 overflow-y-auto">
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
          <li key={track.id} className="select-none">
            <div
              onDoubleClick={() => {
                playTrack(track);
              }}
              className={`group flex gap-4 items-center hover:bg-zinc-800/60  rounded-xl py-2 px-2 cursor-pointer ${
                trackIsPlaying(track.id) || currentTrack?.id === track.id ? "bg-zinc-800/30" : ""
              }`}>
              <div className="text-sm text-zinc-400 dark:text-zinc-500 w-[1.5rem] text-right flex items-center justify-center">
                <span className="group-hover:hidden">
                  {trackIsPlaying(track.id) ? <IoMdPause className="text-zinc-300" /> : <span>{track.id}</span>}
                </span>
                <span className="hidden group-hover:inline">
                  <IoMdPlay />
                </span>
              </div>

              <div className="flex-1 text-md text-zinc-300 dark:text-zinc-300">{track.name}</div>

              {/* TODO: download button */}
              {/* <div className="track-links">
                <a href={track.url} target="_blank" rel="noreferrer" className="opacity-0 group-hover:opacity-100">
                  <MdOutlineFileDownload size={20} className="text-zinc-300 dark:text-zinc-600" />
                </a>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AudioPlaylist;
