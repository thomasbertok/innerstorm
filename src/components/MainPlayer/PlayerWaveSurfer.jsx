import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { waveSurferOptions, hoverOptions } from "@/styles/WaveSurfer/options";
import { usePlayerContext } from "@/context/PlayerContext";
import { formatTime } from "@/utils";
import { CircleAlert } from "lucide-react";

const PlayerWaveSurfer = () => {
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

    // show progress while loading sound
    ws.on("loading", function (X, evt) {
      console.log("Loading: ", X);
    });

    // add key event listener
    document.addEventListener("keyup", onKeyUp);
    return () => {
      ws.destroy();
      document.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const onKeyUp = (event) => {
    // if (event.key === " ") {
    //   setIsPlaying(!isPlaying);
    // }
    // if (event.key === "ArrowLeft") {
    //   clickPrevTrack();
    // }
    // if (event.key === "ArrowRight") {
    //   clickNextTrack();
    // }
  };

  /**
   * when playlist is ready
   * set current track to first track in playlist
   * if current track is null
   */
  // useEffect(() => {
  //   if (playlist && currentTrack === null) {
  //     setCurrentTrack(playlist[0]);
  //   }
  // }, [playlist, currentTrack]);

  /**
   * update wavesurfer play/pause
   */
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
    if (wavesurfer && currentTrack) {
      setIsLoading(true);
      setIsError(false);
      // load track into wavesurfer
      wavesurfer.load(`${import.meta.env.VITE_API_URL}${currentTrack.filename}`, currentTrack.peaks);
      if (isPlaying) wavesurfer.play();

      // set track duration when wavesurfer is ready
      wavesurfer.on("ready", () => {
        setIsLoading(false);
        wavesurfer.setTime(0);
        setTrackDuration(formatTime(wavesurfer.getDuration()));
      });

      // set next track when current track ends
      wavesurfer.on("finish", () => {
        setNextTrack();
      });

      // update track position every second
      wavesurfer.on("audioprocess", () => {
        setTrackPosition(formatTime(wavesurfer.getCurrentTime()));
      });

      wavesurfer.on("error", (error) => {
        setIsError(true);
        setIsLoading(false);
        console.error("!!! Wavesurfer Track Load Error");
        setIsPlaying(false);
      });
    }
  }, [currentTrack]);

  /**
   * update wavesurfer volume according to volume state
   */
  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setVolume(volume);
    }
  }, [volume]);

  return (
    <>
      <div className="player-waveSurfer items-center justify-between flex gap-4 py-4">
        {isLoading && <div className="loading flex items-center justify-center h-full">Loading track...</div>}

        {isError && (
          <div className="error flex items-center justify-center h-full">
            <CircleAlert className="mr-2" size={20} /> Error loading track.
          </div>
        )}
        <div
          className={`waveform ${!isError && !isLoading && currentTrack ? "visible" : "hidden"} `}
          ref={waveformRef}></div>
      </div>
      <div className="player-duration time time-current text-zinc-300 dark:text-zinc-400 flex-0 text-right">
        {isPlaying && currentTrack ? trackPosition : formatTime(currentTrack?.length) || 0}
      </div>
    </>
  );
};

export default PlayerWaveSurfer;
