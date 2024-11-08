import { useEffect, useState, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { waveSurferOptions, hoverOptions } from "@/styles/WaveSurfer/options";
import { usePlayerContext } from "@/context/PlayerContext";
import { formatTime } from "@/utils";
import { Play, Pause, ChevronFirst, ChevronLast, Shuffle, Repeat, Repeat1 } from "lucide-react";

const AudioPlayer = () => {
  const {
    currentTrack,
    setCurrentTrack,
    currentTrackCover,
    playlist,
    isPlaying,
    setIsPlaying,
    setNextTrack,
    isRepeat,
    setIsRepeat,
    isShuffled,
    setIsShuffled,
    clickPrevTrack,
    clickNextTrack,
    volume,
    setVolume,
  } = usePlayerContext();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [wavesurfer, setWavesurfer] = useState(null);
  const [trackPosition, setTrackPosition] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);

  const waveformRef = useRef(null);

  /**
   * ON PAGE LOAD
   * Set wavesurfer options
   * create wavesurfer instance
   * fetch peak data
   * set wavesurfer
   */
  useEffect(() => {
    // create wavesurfer instance
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      backend: "MediaElement",
      ...waveSurferOptions,
      plugins: [Hover.create(hoverOptions)],
    });
    // set volume
    ws.setVolume(0.5);
    // set wavesurfer state
    setWavesurfer(ws);
    console.log(">>> wavesurfer instance created.");
    return () => ws.destroy();
  }, []);

  const handlePlayButtonClick = () => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying(!isPlaying);
    }
  };

  /**
   * when playlist is ready
   * set current track to first track in playlist
   * if current track is null
   */

  useEffect(() => {
    // console.log("playlist, curretnTrack");
    if (playlist && currentTrack === null) {
      setCurrentTrack(playlist[0]);
    }
  }, [playlist, currentTrack]);

  useEffect(() => {
    if (wavesurfer) {
      if (isPlaying) wavesurfer.play();
      else wavesurfer.pause();
    }
  }, [isPlaying]);

  /**
   * set track duration
   * update track position
   */
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    //setTrackPosition(0);
    //setTrackDuration(0);
    // console.log(">>> currentTrack", currentTrack);
    // console.log(">>> COVER", currentTrackCover);

    if (wavesurfer && currentTrack) {
      // load track into wavesurfer
      wavesurfer.load(`${import.meta.env.VITE_API_URL}${currentTrack.filename}`, currentTrack.peaks);
      setIsLoading(false);
      if (isPlaying) wavesurfer.play();

      // set track duration when wavesurfer is ready
      wavesurfer.on("ready", () => {
        setTrackDuration(formatTime(wavesurfer.getDuration()));
      });

      // play next track when current track ends
      wavesurfer.on("finish", () => {
        setNextTrack();
      });

      // update track position every second
      wavesurfer.on("audioprocess", () => {
        setTrackPosition(formatTime(wavesurfer.getCurrentTime()));
      });

      wavesurfer.on("error", (error) => {
        setIsError(true);
        console.error("!!! Track Load Error: ", error);
      });
    }
  }, [currentTrack]);

  return (
    <>
      <div className="grid-cover flex items-center justify-center">
        {!currentTrack && <div className="text-3xl font-light text-zinc-100 dark:text-zinc-300">No track selected</div>}
        {currentTrack && (
          <img
            className=""
            src={currentTrackCover}
            alt={currentTrack.title}
            onError={(e) => {
              e.target.onError = null;
              e.target.src = "music/cover/default.jpg";
            }}
            loading="lazy"
          />
        )}
      </div>

      <div className="grid-title no-scroll">
        {isLoading && <div className="loading flex items-center justify-center">Loading...</div>}
        {!isLoading && !isError && currentTrack && (
          <div className="flex items-center justify-center flex-col gap-1">
            <div className="track-title text-3xl font-light text-zinc-100 dark:text-zinc-300">{currentTrack.title}</div>
            <div className="text-sm font-medium text-zinc-400 dark:text-zinc-400 hover:text-zinc-300">
              {/* {currentTrack.style.map((style) => `#${style} `)} */}
              {currentTrack.genre}
              {currentTrack.year !== "Unknown" && ` / ${currentTrack.year}`}
            </div>
          </div>
        )}
      </div>

      <div className="grid-waveform flex flex-col items-center justify-center no-scroll">
        {isError && (
          <div className="error flex items-center justify-center h-full">Error loading track. Please try again.</div>
        )}
        <div
          className={`waveform ${!isError && !isLoading && currentTrack ? "visible" : "hidden"} `}
          ref={waveformRef}></div>
      </div>

      <div className="grid-controls flex items-center justify-between gap-4 no-scroll">
        <div className="time time-current text-zinc-300 dark:text-zinc-400 flex-1 text-right">
          {trackPosition !== 0 ? trackPosition : ""}
        </div>

        <div className="controls flex items-center justify-center gap-4 flex-0">
          {/* SHUFFLE */}
          <button
            onClick={() => {
              setIsShuffled(!isShuffled);
            }}>
            <Shuffle size={20} className={isShuffled ? "text-zinc-100" : "text-zinc-400"} />
          </button>

          {/* PREVIOUS */}
          <button className="">
            <ChevronFirst
              size={28}
              onClick={clickPrevTrack}
              className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
              disabled={playlist && currentTrack === playlist[0] && isRepeat !== 2}
            />
          </button>

          {/* PLAY/PAUSE */}
          <button
            className="group button border-2 border-zinc-300 dark:border-zinc-400 rounded-full w-12 h-12 flex items-center justify-center hover:bg-zinc-100/80 hover:border-transparent transition-colors"
            onClick={handlePlayButtonClick}>
            {isPlaying ? (
              <Pause size={24} className="text-zinc-300 dark:text-zinc-400 group-hover:text-zinc-600" />
            ) : (
              <Play
                size={24}
                className="transform translate-x-[1px] text-zinc-300 dark:text-zinc-400 group-hover:text-zinc-600"
              />
            )}
          </button>

          {/* NEXT */}
          <button className="disabled:text-zinc-400" onClick={clickNextTrack}>
            <ChevronLast
              size={28}
              className="text-zinc-300 hover:text-zinc-100 dark:text-zinc-400 hover:dark:text-zinc-100"
              disabled={playlist && currentTrack === playlist[playlist.length - 1] && isRepeat !== 2}
            />
          </button>

          {/* REPEAT */}
          <button className="" onClick={() => setIsRepeat((isRepeat + 1) % 3)}>
            {isRepeat === 0 ? (
              <Repeat size={22} className="text-zinc-400 hover:text-zinc-100" />
            ) : isRepeat === 1 ? (
              <Repeat1 size={22} />
            ) : (
              <Repeat size={22} className="text-zinc-300" />
            )}
          </button>
        </div>

        <div className="time time-total text-zinc-300 dark:text-zinc-400 flex-1 flex justify-between items-center">
          <span>{trackDuration !== 0 ? trackDuration : ""}</span>
          {/* <span className="cursor-pointer relative" onClick={() => setIsVolumeVisible(!isVolumeVisible)}>
            <TbVolume size={20} className="text-zinc-400 hover:text-zinc-100" />
            <div className={`volume-container ${isVolumeVisible ? "flex" : "hidden"}`}>
              <input
                className="volume-range"
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(newValue) => {
                  setVolume(newValue);
                }}
              />
            </div>
          </span> */}
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
