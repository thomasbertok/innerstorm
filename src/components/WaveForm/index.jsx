import { useCallback, useRef, useMemo, useEffect, useState } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { formatTime } from "@/utils";
import { FaPlay, FaPause } from "react-icons/fa";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";

const ctx = document.createElement("canvas").getContext("2d");
const gradient = ctx.createLinearGradient(0, 0, 0, 150);
gradient.addColorStop(0, "rgb(200, 200, 210)");
gradient.addColorStop(0.5, "rgb(150, 150, 160)");
gradient.addColorStop(1, "rgb(110, 110, 120)");

const waveFormStyle = {
  backgroundColor: "transparent",
  waveColor: gradient,
  progressColor: "",
  barWidth: 4,
  barRadius: 2,
  cursorWidth: 1,
  cursorColor: "transparent",
  responsive: true,
  height: 120,
  normalize: true,
};

const hoverStyle = {
  lineColor: "#fff",
  lineWidth: 4,
  labelBackground: "rgba(255, 255, 255, 1)",
  labelColor: "#333",
  labelSize: "12px",
};

const Waveform = ({ trackData }) => {
  if (!trackData) return null;

  const url = "http://localhost:8080/stream.php?file=" + trackData.url;

  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [peaksData, setPeaksData] = useState(null);

  const { wavesurfer, isReady, isPlaying, currentTime, loading } = useWavesurfer({
    container: containerRef,
    backend: "MediaElement",
    ...waveFormStyle,
    plugins: useMemo(() => [Hover.create(hoverStyle)], []),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause();
  }, [wavesurfer]);

  const getAudioJson = () => {
    setIsLoading(true);
    fetch(`./mp3/${trackData.name}.json`)
      .then((response) => response.json())
      .then((peaksData) => {
        console.log(trackData.name, "DATA:", peaksData);
        setPeaksData(peaksData);
      })
      .catch((error) => {
        console.error("Error fetching audio JSON:", error.message);
        return null;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAudioJson();
  }, []);

  useEffect(() => {
    if (peaksData) {
      //console.log("peaksData", peaksData.data);
      wavesurfer.load(url, peaksData.data);
    }
  }, [peaksData]);

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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-slate-100 w-12 h-12 flex items-center justify-center rounded-full"
            onClick={onPlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
        </div>

        <div className="wave flex-1">
          {isLoading ? (
            <div className="loading-spinner">Loading...</div>
          ) : (
            <div className="wave-wrapper" ref={containerRef} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Waveform;
