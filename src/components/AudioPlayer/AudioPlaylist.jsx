import { useContext } from "react";
import { useAppContext } from "@/context/AppContext";
import { MdPlayCircleOutline } from "react-icons/md";
import { IoMdPlay, IoMdPause } from "react-icons/io";
import { MdOutlineFileDownload } from "react-icons/md";
import { formatTime } from "@/utils";

const AudioPlaylist = () => {
  const { currentTrack, setCurrentTrack, playlist, play, playTrack, trackIsPlaying, loadingPlaylist } = useAppContext();
  if (!playlist) return null;

  // alphabeticval ordering of tracks by name
  // TODO: sort by date descending | needs additional db.json data
  const orderedPlaylist = playlist.sort((a, b) => a.slug.localeCompare(b.slug));

  return (
    <div className="grid-playlist no-scroll">
      <div className="h-full overflow-y-auto">
        {loadingPlaylist && <div className="text-sm text-zinc-300 dark:text-zinc-600">Loading...</div>}
        <ul className="playlist-list">
          {orderedPlaylist.map((track, index) => (
            <li key={track.id} className="select-none">
              <div
                onClick={() => {
                  playTrack(track);
                }}
                className={`group flex gap-3 items-center hover:bg-zinc-800/60 rounded-xl py-2 pl-1 pr-3 cursor-pointer ${
                  trackIsPlaying(track.id) || currentTrack?.id === track.id ? "bg-zinc-800/30" : ""
                }`}>
                <div className="text-sm text-zinc-400 dark:text-zinc-500 w-[1.5rem] text-right flex items-center justify-center">
                  <span className="group-hover:hidden">
                    {trackIsPlaying(track.id) ? <IoMdPause className="text-zinc-300" /> : <span>{index + 1}</span>}
                  </span>
                  <span className="hidden group-hover:inline">
                    <IoMdPlay />
                  </span>
                </div>

                <div className="flex-1 text-md text-zinc-300 dark:text-zinc-300 flex gap-5 items-center justify-between overflow-hidden">
                  <span className="flex-1 text-nowrap text-ellipsis">{track.title}</span>
                  <span className="flex-0 time time-length text-zinc-400 group-hover:text-zinc-300">
                    {formatTime(track.length)}
                  </span>
                </div>
              </div>
            </li>
          ))}

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
        </ul>
      </div>
    </div>
  );
};

export default AudioPlaylist;
