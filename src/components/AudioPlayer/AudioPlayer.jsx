import { useContext, useEffect, useState, useRef, useMemo, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { waveSurferOptions, hoverOptions } from "@/styles/WaveSurfer/options";
import { GrPlayFill, GrPauseFill, GrChapterNext, GrChapterPrevious } from "react-icons/gr";
import { TbArrowsShuffle, TbRepeat } from "react-icons/tb";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { useAppContext } from "@/context/AppContext";
import { fetchPeakData } from "@/utils/fetchPeakData";
import { formatTime } from "@/utils";

const AudioPlayer = () => {
  const {
    currentTrack,
    setCurrentTrack,
    currentTrackCover,
    playlist,
    isPlaying,
    togglePlay,
    setNextTrackIndex,
    setPreviousTrackIndex,
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
      togglePlay();
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
    // console.log("currentTrack", currentTrack);
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
        {isLoading && currentTrack && <div className="loading flex items-center justify-center">Loading...</div>}
        {!isLoading && currentTrack && (
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

      <div className="grid-controls flex items-center justify-between">
        <div className="time time-current font-mono text-zinc-400 dark:text-zinc-500 flex-1">
          {trackPosition !== 0 ? trackPosition : ""}
        </div>

        <div className="controls flex items-center justify-center gap-6 flex-0">
          <button onClick={() => {}}>
            <TbArrowsShuffle size={22} />
          </button>

          <button className="">
            <GrChapterPrevious size={20} />
          </button>
          <button
            className="button border-2 rounded-full w-12 h-12 flex items-center justify-center"
            onClick={handlePlayButtonClick}>
            {isPlaying ? <CiPause1 size={24} /> : <CiPlay1 size={24} className="pl-1" />}
          </button>
          <button className="">
            <GrChapterNext size={20} />
          </button>

          <button className="">
            <TbRepeat size={22} />
          </button>
        </div>

        <div className="time time-total font-mono text-zinc-400 dark:text-zinc-500 flex-1 text-right">
          {trackDuration !== 0 ? trackDuration : ""}
        </div>
      </div>
    </>
  );
};

export default AudioPlayer;
