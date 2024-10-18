const ctx = document.createElement("canvas").getContext("2d");
const waveGradient = ctx.createLinearGradient(0, 0, 0, 150);
waveGradient.addColorStop(0, "rgba(200, 200, 200)");
waveGradient.addColorStop(0.33, "rgb(220, 220, 220)");
waveGradient.addColorStop(1, "rgb(200, 200, 200)");

const progressGradient = ctx.createLinearGradient(0, 0, 0, 150);
progressGradient.addColorStop(0, "rgba(220, 220, 230, 0.5)");
progressGradient.addColorStop(0.5, "rgba(200, 200, 200, 0.5)");
progressGradient.addColorStop(1, "rgba(160, 160, 180, 0.5)");

/**
 * Options
 * https://wavesurfer.xyz/docs/types/wavesurfer.WaveSurferOptions
 */
export const waveSurferOptions = {
  backgroundColor: "transparent",
  barAlign: "bottom",
  barHeight: 1,
  barGap: 2,
  barRadius: 2,
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

/**
 * Hover Options
 * https://wavesurfer.xyz/docs/modules/plugins_hover
 */
export const hoverOptions = {
  labelBackground: "rgba(255, 255, 255, .9)",
  labelColor: "#333",
  labelSize: "12px",
  lineColor: "rgba(255, 255, 255, 1)",
  lineWidth: 1,
};
