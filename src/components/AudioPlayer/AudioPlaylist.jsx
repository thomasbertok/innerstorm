import { usePlayerContext } from "@/context/PlayerContext";
import { formatTime } from "@/utils";
import { Play, Pause } from "lucide-react";

const AudioPlaylist = () => {
  const { currentTrack, playlist, playTrack, pause, trackIsPlaying, loadingPlaylist } = usePlayerContext();
  if (!playlist) return null;

  // alphabeticval ordering of tracks by name
  // TODO: sort by date descending | needs additional db.json data
  const orderedPlaylist = playlist.sort((a, b) => a.slug.localeCompare(b.slug));

  const handlePlaypauseTrack = (track) => {
    if (currentTrack) {
      trackIsPlaying(track.id) ? pause() : playTrack(track);
    }
  };

  return (
    <div className="grid-playlist no-scroll">
      <div className="h-full overflow-y-auto">
        {loadingPlaylist && <div className="text-sm text-zinc-300 dark:text-zinc-600">Loading...</div>}
        <ul className="playlist-list">
          {orderedPlaylist.map((track, index) => (
            <li key={track.id} className="select-none">
              <div
                className={`group flex gap-3 items-center hover:bg-zinc-800/60 rounded-xl pl-1 pr-3 cursor-pointer ${
                  trackIsPlaying(track.id) || currentTrack?.id === track.id ? "bg-zinc-800/30" : ""
                }`}>
                <div
                  onClick={() => handlePlaypauseTrack(track)}
                  className=" text-sm text-zinc-400 dark:text-zinc-500 w-[1.5rem] text-right flex items-center justify-center">
                  <span className="group-hover:hidden">
                    {trackIsPlaying(track.id) ? (
                      <Pause size={18} className="text-zinc-300" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </span>
                  <span className="hidden group-hover:inline">
                    {trackIsPlaying(track.id) ? <Pause size={18} /> : <Play size={18} />}
                  </span>
                </div>

                <div
                  onClick={() => {
                    playTrack(track);
                  }}
                  className="flex-1 text-md text-zinc-300 dark:text-zinc-300 flex gap-5 items-center justify-between py-2 overflow-hidden">
                  <span className="flex-1 text-nowrap text-ellipsis">{track.title}</span>
                  <span className="flex-0 time time-length text-zinc-400 group-hover:text-zinc-300">
                    {formatTime(track.length)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AudioPlaylist;
