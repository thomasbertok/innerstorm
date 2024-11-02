import { easeInOutCubic, easeOutCubic, easeInCubic } from "./ease";

export default function animatedScrollTo(scrollTo, duration, callback) {
  const scrollFrom = window.scrollY || window.pageYOffset || 0;
  const scrollDiff = scrollTo - scrollFrom;
  let currentTime = 0;
  const increment = 20;

  (function animateScroll() {
    currentTime += increment;
    const newScrollPos = easeInOutCubic(currentTime, scrollFrom, scrollDiff, duration);
    window.scrollTo(0, newScrollPos);

    if (currentTime > duration) {
      callback();
      return;
    }

    setTimeout(animateScroll, increment);
  })();
}
