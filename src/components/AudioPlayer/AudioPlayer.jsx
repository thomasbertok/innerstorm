import { useContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { waveSurferOptions, hoverOptions } from "@/styles/WaveSurfer/options";
import { GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { TbArrowsShuffle, TbRepeat, TbRepeatOnce, TbRepeatOff } from "react-icons/tb";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { useAppContext } from "@/context/AppContext";
import { formatTime } from "@/utils";

import {
  TbPlayerSkipForwardFilled,
  TbPlayerSkipBackFilled,
  TbPlayerPlayFilled,
  TbPlayerPauseFilled,
  TbVolume,
} from "react-icons/tb";

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
  } = useAppContext();

  const [isLoading, setIsLoading] = useState(true);
  const [wavesurfer, setWavesurfer] = useState(null);
  const [trackPosition, setTrackPosition] = useState(0);
  const [trackDuration, setTrackDuration] = useState(0);

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
    console.log(">>> wavesurfer instance created.", ws);
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

  /**
   * set track duration
   * update track position
   */
  useEffect(() => {
    setIsLoading(true);
    // setTrackPosition(0);
    // setTrackDuration(0);
    // console.log(">>> currentTrack", currentTrack);
    // console.log(">>> COVER", currentTrackCover);

    if (wavesurfer && currentTrack) {
      // load track into wavesurfer
      wavesurfer.load(`${import.meta.env.VITE_API_URL}${currentTrack.url}`, currentTrack.peaks.data);

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
    }
  }, [currentTrack]);

  return (
    <>
      <div className="grid-cover flex items-center justify-center">
        <div className="cover">
          {!currentTrack && (
            <div className="text-3xl font-light text-zinc-100 dark:text-zinc-300">No track selected</div>
          )}
          {currentTrack && (
            <img
              className=""
              src={currentTrackCover}
              alt={currentTrack.name}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = "music/cover/default.jpg";
              }}
              loading="lazy"
            />
          )}
        </div>
      </div>

      <div className="grid-title">
        {isLoading && <div className="loading flex items-center justify-center">Loading...</div>}
        {currentTrack && (
          <div className="flex items-center justify-center flex-col gap-1">
            <div className="text-3xl font-light text-zinc-100 dark:text-zinc-300">{currentTrack.name}</div>
            <div className="text-sm font-medium text-zinc-400 dark:text-zinc-400 hover:text-zinc-300">
              {currentTrack.style.map((style) => `#${style} `)}
            </div>
          </div>
        )}
      </div>

      <div className="grid-waveform flex flex-col items-center justify-center">
        <div className="waveform" ref={waveformRef}></div>
      </div>

      <div className="grid-controls flex items-center justify-between gap-4">
        <div className="time time-current font-mono text-zinc-300 dark:text-zinc-400 flex-1 text-right">
          {trackPosition !== 0 ? trackPosition : ""}
        </div>

        <div className="controls flex items-center justify-center gap-4 flex-0">
          {/* SHUFFLE */}
          <button
            onClick={() => {
              setIsShuffled(!isShuffled);
            }}>
            <TbArrowsShuffle size={24} className={isShuffled ? "text-zinc-100" : "text-zinc-400"} />
          </button>

          {/* PREVIOUS */}
          <button className="">
            <TbPlayerSkipBackFilled
              size={24}
              onClick={clickPrevTrack}
              disabled={playlist && currentTrack === playlist[0] && isRepeat !== 2}
            />
          </button>

          {/* PLAY/PAUSE */}
          <button
            className="group button border-2 rounded-full w-12 h-12 flex items-center justify-center hover:bg-zinc-100/70 hover:border-transparent transition-colors"
            onClick={handlePlayButtonClick}>
            {isPlaying ? (
              <TbPlayerPauseFilled size={24} className="text-zinc-100 group-hover:text-zinc-600" />
            ) : (
              <TbPlayerPlayFilled size={24} className="text-zinc-100 group-hover:text-zinc-600" />
            )}
          </button>

          {/* NEXT */}
          <button
            className="disabled:text-zinc-400"
            onClick={clickNextTrack}
            disabled={playlist && currentTrack === playlist[playlist.length - 1] && isRepeat !== 2}>
            <TbPlayerSkipForwardFilled size={24} />
          </button>

          {/* REPEAT */}
          <button className="" onClick={() => setIsRepeat((isRepeat + 1) % 3)}>
            {isRepeat === 0 ? (
              <TbRepeatOff size={22} className="text-zinc-400 hover:text-zinc-100" />
            ) : isRepeat === 1 ? (
              <TbRepeatOnce size={22} />
            ) : (
              <TbRepeat size={22} />
            )}
          </button>
        </div>

        <div className="time time-total font-mono text-zinc-300 dark:text-zinc-400 flex-1 flex justify-between items-center">
          <span>{trackDuration !== 0 ? trackDuration : ""}</span>
          <span className="cursor-pointer relative">
            <TbVolume size={20} className="text-zinc-400 hover:text-zinc-100" />
            <div className="volume-container">
              <input className="volume-range" type="range" min={0} max={1} step={0.01} value={0.5} />
            </div>
          </span>
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
