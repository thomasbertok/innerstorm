export function easeInOutCubic(currentTime, startValue, changeInValue, duration) {
  const time = currentTime / duration - 1;
  const timeCubic = time * time * time;
  return changeInValue * (timeCubic + 1) + startValue;
}

export function easeOutCubic(currentTime, startValue, changeInValue, duration) {
  const time = currentTime / duration - 1;
  const timeCubic = time * time * time + 1;
  return changeInValue * timeCubic + startValue;
}

export function easeInCubic(currentTime, startValue, changeInValue, duration) {
  const time = currentTime / duration;
  const timeCubic = time * time * time;
  return changeInValue * timeCubic + startValue;
}
