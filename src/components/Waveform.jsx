import { useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { formatTime } from "../utils";
import { FaPlay, FaPause } from "react-icons/fa";

export const Waveform = ({ trackData }) => {
  const containerRef = useRef(null);

  const { wavesurfer, isReady, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: trackData.url,
    backgroundColor: "#efefef",
    waveColor: "efefef",
    progressColor: "#2d5bff",
    barWidth: 3,
    barRadius: 3,
    cursorWidth: 1,
    cursorColor: "transparent",
    responsive: true,
    height: 120,
    normalize: true,
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="w-full waveform-wrapper flex flex-col gap-4">
      <div className="info flex items-center justify-between">
        <div className="track-name text-xl font-bold">{trackData.name}</div>
        <div className="track-time flex items-center justify-end gap-2">
          <p>{isReady ? formatTime(currentTime) : "..."}</p>
          <span>/</span>
          <p>{isReady ? formatTime(wavesurfer.getDuration()) : "..."}</p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center gap-4">
        <div className="playButton">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-full" onClick={onPlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        <div className="wave flex-1">
          <div ref={containerRef} />
        </div>
      </div>
    </div>
  );
};
