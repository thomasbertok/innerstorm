import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import WaveSurfer from "wavesurfer.js";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrPlayFill, GrPauseFill } from "react-icons/gr";

import { formatTime } from "@/utils";
const ctx = document.createElement("canvas").getContext("2d");
const waveGradient = ctx.createLinearGradient(0, 0, 0, 150);
waveGradient.addColorStop(0, "rgba(220, 220, 230)");
waveGradient.addColorStop(0.33, "rgb(220, 220, 220)");
waveGradient.addColorStop(1, "rgb(160, 160, 180)");

const progressGradient = ctx.createLinearGradient(0, 0, 0, 150);
progressGradient.addColorStop(0, "rgba(220, 220, 230, 0.5)");
progressGradient.addColorStop(0.5, "rgba(220, 220, 220, 0.5)");
progressGradient.addColorStop(1, "rgba(160, 160, 180, 0.5)");

const waveSurferOptions = {
  backgroundColor: "transparent",
  barAlign: "center",
  barHeight: 1,
  barGap: 1,
  barRadius: 0,
  barWidth: 2,
  cursorColor: "transparent",
  cursorWidth: 1,
  height: "auto",
  normalize: false,
  progressColor: progressGradient,
  responsive: true,
  waveColor: waveGradient,
  width: "100%",
};

const hoverOptions = {
  labelBackground: "rgba(255, 255, 255, .9)",
  labelColor: "#333",
  labelSize: "12px",
  lineColor: "rgba(255, 255, 255, 1)",
  lineWidth: 1,
};

const WaveSurf = ({ trackData }) => {
  if (!trackData) return null;
  const [wavesurfer, setWavesurfer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [peaksData, setPeaksData] = useState(null);
  const [trackDuration, setTrackDuration] = useState(0);
  const [trackPosition, setTrackPosition] = useState(0);

  const waveformRef = useRef(null);

  const fullUrl = useMemo(() => `${import.meta.env.VITE_API_URL}${trackData.url}`, [trackData.url]);

  const fetchPeakData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_PEAKFILES_URL}${trackData.name}.json`);
      if (!response.ok) throw new Error("Failed to fetch audio JSON");
      const { data } = await response.json();
      setPeaksData(data);
    } catch (error) {
      console.error("Error fetching peak data:", error);
    }
  };

  const togglePlay = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying((prevState) => !prevState);
    }
  }, [wavesurfer]);

  useEffect(() => {
    // create wavesurfer instance
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      backend: "MediaElement",
      ...waveSurferOptions,
      plugins: [Hover.create(hoverOptions)],
    });

    setWavesurfer(ws);
    fetchPeakData();

    return () => ws.destroy();
  }, []);

  // if peaks data is loaded and wavesurfer is ready, load the audio
  useEffect(() => {
    if (peaksData && wavesurfer) {
      console.log("peaksData", peaksData);
      wavesurfer.load(fullUrl, peaksData);
      wavesurfer.on("ready", () => {
        setIsLoading(false);
        setTrackDuration(formatTime(wavesurfer.getDuration()));
      });

      wavesurfer.on("audioprocess", () => {
        setTrackPosition(formatTime(wavesurfer.getCurrentTime()));
      });
    }
  }, [peaksData, wavesurfer, fullUrl]);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div className="waveform-container">
          <div className="button-wrapper w-1/12 items-center justify-center flex flex-col">
            <button
              className="flex items-center justify-center  rounded-full w-20 h-20 bg-zinc-900 pl-1"
              onClick={togglePlay}>
              {isPlaying ? <GrPauseFill size={28} /> : <GrPlayFill size={28} />}
            </button>
          </div>

          <div className="waveform-wrapper flex-1 flex flex-col">
            <div className="flex flex-row items-center justify-between pb-4">
              <div className="track-title">{trackData.name}</div>
              <div className="waveform-track-time flex items-center gap-1">
                <div className="waveform-position">{trackPosition}</div>
                <div>/</div>
                <div className="waveform-duration">{trackDuration}</div>
              </div>
            </div>

            <div className="waveform" id="waveform" ref={waveformRef}></div>

            <div className="waveform-hover"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default WaveSurf;
