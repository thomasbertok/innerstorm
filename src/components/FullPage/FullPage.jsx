import React, { useEffect, useState, useRef, useCallback } from "react";
import { debounce } from "@/utils";
import { ControlMenu } from "./ControlMenu";
import isMobileDevice from "./utils/is-mobile";
import animatedScrollTo from "./utils/animated-scroll-to";
import Slide from "./Slide";

/**
 * The FullPage component is a full-page slider that allows for smooth transitions between pages.
 * It is designed to be highly customizable, with options for controlling the duration of transitions,
 * displaying controls for navigation, and dynamically setting the active page.
 *
 * @param {ReactElement} children - The content of the pages to be displayed.
 * @param {number} duration - The duration of the transition between pages in milliseconds.
 * @param {boolean} controls - A boolean indicating whether navigation controls should be displayed.
 * @param {boolean} open - A boolean indicating whether the slider is currently open.
 * @param {function} setOpen - A function to set the open state of the slider.
 * @param {number} activePage - The index of the currently active page.
 * @param {function} setActivePage - A function to set the active page.
 * @param {string} noScrollClass - The class name to apply to elements that should not be scrollable.
 *
 * @returns A full-page slider component with customizable transitions and navigation controls.
 */

const FullPage = ({
  children,
  duration = 400,
  desktopOnly = true,
  controls,
  open,
  setOpen,
  activePage,
  setActivePage,
  noScrollClass = ".no-scroll",
}) => {
  const [slideCount, setSlideCount] = useState(getChildrenCount(children));
  const [activeSlide, setActiveSlide] = useState(activePage);

  const slidePositions = useRef([]);
  const isScrolling = useRef(false);
  const isMobile = useRef(null);
  const touchStart = useRef(0);
  const touchSensitivity = useRef(100);

  // get slides' names from children
  const getSlidesNames = () => {
    return React.Children.map(children, (child) => child.props.title);
  };

  // count slides
  function getChildrenCount(children) {
    const childrenArr = React.Children.toArray(children);
    const slides = childrenArr.filter(
      ({ type }) => type === Slide || type?.displayName === "Slide" || type?.name === "Slide"
    );
    return slides.length;
  }

  // setup and update slide coordinates
  const updateSlidePositions = useCallback(() => {
    slidePositions.current = [];
    let slideHeight = window.innerHeight;

    for (let i = 0; i < slideCount; i++) {
      slidePositions.current[i] = slideHeight * i;
    }
  }, [slideCount]);

  useEffect(() => {
    isMobile.current = isMobileDevice();
    if (desktopOnly && isMobile.current) {
      document.body.classList.remove("fullpage");
      return;
    } else {
      document.body.classList.add("fullpage");
    }
    updateSlidePositions();
    scrollToSlide(activePage);
  }, []);

  // first load
  useEffect(() => {
    scrollToSlide(activePage);
    window.addEventListener("resize", debounce(handleResize, 100), { passive: false });

    if (isMobile.current && !desktopOnly) {
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchstart", handleTouchStart);
    } else {
      document.addEventListener("wheel", handleScroll, { passive: false });
      document.addEventListener("keydown", handleKeyUp, { passive: false });
    }

    return () => {
      if (isMobile.current && !desktopOnly) {
        document.removeEventListener("touchstart", handleTouchStart);
        document.removeEventListener("touchmove", handleTouchMove, { passive: false });
      } else {
        document.removeEventListener("wheel", handleScroll);
        document.removeEventListener("keydown", handleKeyUp);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [activePage, activeSlide]);

  const canScroll = (event) => {
    return !event.target.closest(noScrollClass);
  };

  // on resize
  const handleResize = () => {
    if (desktopOnly) {
      return;
    }
    // update slide positions
    updateSlidePositions();
    // update active slide
    scrollToSlide(activePage);
  };

  // on key up
  const handleKeyUp = (event) => {
    if (event.key === "ArrowDown") {
      scrollToSlide(activeSlide + 1);
    } else if (event.key === "ArrowUp") {
      scrollToSlide(activeSlide - 1);
    }
  };

  // on touch start
  const handleTouchStart = (event) => {
    // isScrolling.current = true;
    if (!isMobile.current) return;
    touchStart.current = event.touches[0].clientY;
  };

  // on mobile touch move event
  const handleTouchMove = (event) => {
    if (canScroll(event) && isMobile.current) {
      event.preventDefault();
      const touchEnd = event.touches[0].clientY;
      if (!isScrolling.current) {
        const isScrollingDown = touchStart.current > touchEnd + touchSensitivity.current;
        const isScrollingUp = touchStart.current < touchEnd - touchSensitivity.current;

        if (isScrollingDown) {
          scrollToSlide(activeSlide + 1);
        } else if (isScrollingUp) {
          scrollToSlide(activeSlide - 1);
        }
      }
    }
  };

  // on scroll event handler
  const handleScroll = (evt) => {
    if (isMobile.current) return;
    if (isScrolling.current) return;

    if (canScroll(evt)) {
      evt.preventDefault();
      const scrollDelta = (evt.wheelDelta || -evt.deltaY || -evt.detail) < 0;
      const newActiveSlide = scrollDelta ? activeSlide + 1 : activeSlide - 1;
      scrollToSlide(newActiveSlide);
    }
  };

  // Scroll to a certain slide
  const scrollToSlide = useCallback(
    (slide) => {
      if (!isScrolling.current && slide >= 0 && slide < slideCount) {
        isScrolling.current = true;
        setActiveSlide(slide);
        setActivePage(slide);

        animatedScrollTo(slidePositions.current[slide], duration, () => {
          isScrolling.current = false;
        });
      }
    },
    [activePage]
  );

  const renderControls = () => {
    if (!controls) return null;

    const controlMenuProps = {
      open,
      setOpen,
      scrollToSlide,
      slidesCount: slideCount,
      currentSlideIndex: activeSlide,
      slidesNames: getSlidesNames(),
    };

    if (controls === true) {
      return <ControlMenu className="full-page-controls" {...controlMenuProps} />;
    }
  };

  // render
  return (
    <div className="full-page" id="full-page">
      {renderControls()}
      {React.Children.toArray(children).map((child, index) => {
        return React.cloneElement(child, {
          className: `full-page-slide ${activeSlide === index ? "active" : "inactive"}`,
          key: index,
        });
      })}
    </div>
  );
};

export default FullPage;
