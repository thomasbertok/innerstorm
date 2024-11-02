// converts seconds to mm:ss
export const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(":");

// debounce,
// from https://davidwalsh.name/javascript-debounce-function
export const debounce = (func, time) => {
  time = time || 100;
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, time);
  };
};
