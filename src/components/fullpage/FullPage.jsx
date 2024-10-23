import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Slide from "./Slide";
import animatedScrollTo from "./utils/animated-scroll-to";
import isMobileDevice from "./utils/is-mobile";
import { getObjectValues } from "./utils/helpers";
import Controls from "./Controls";
import { ControlMenu } from "./ControlMenu";

export default class FullPage extends React.Component {
  static getChildrenCount = (children) => {
    const childrenArr = React.Children.toArray(children);
    const slides = childrenArr.filter(({ type }) => type === Slide);
    return slides.length;
  };

  constructor(props) {
    super(props);

    this._isScrollPending = false;
    this._isScrolledAlready = false;
    this._slidePositions = [];

    this._touchSensitivity = 100;
    this._touchStart = 0;
    this._isMobile = null;

    this.state = {
      activeSlide: props.activePage,
      slidesCount: FullPage.getChildrenCount(this.props.children),
    };
  }

  componentDidMount() {
    this._isMobile = isMobileDevice();
    if (this._isMobile) {
      document.addEventListener("touchmove", this.onTouchMove, { passive: false });
      document.addEventListener("touchstart", this.onTouchStart);
    } else {
      document.addEventListener("wheel", this.onScroll, { passive: false });
    }
    window.addEventListener("resize", this.onResize);

    this.onResize();
    this.scrollToSlide(this.props.activePage);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activePage !== this.props.activePage) {
      //console.log('notify!');
      this.setState({
        activeSlide: this.props.activePage,
      });
      this.scrollToSlide(this.props.activePage);
    }
  }

  componentWillUnmount() {
    if (this._isMobile) {
      document.removeEventListener("touchmove", this.onTouchMove);
      document.removeEventListener("touchstart", this.onTouchStart);
    } else {
      document.removeEventListener("wheel", this.onScroll);
    }
    window.removeEventListener("resize", this.onResize);
  }

  updateSlides = () => {
    this._slidePositions = [];
    for (let i = 0; i < this.state.slidesCount; i++) {
      this._slidePositions.push(window.innerHeight * i);
    }
  };

  onResize = () => {
    this.updateSlides();
    this.setState({
      height: window.innerHeight,
    });
    this.setState({
      fullHeight: window.innerHeight * this.state.slidesCount,
    });
  };

  onTouchStart = (evt) => {
    this._touchStart = evt.touches[0].clientY;
    this._isScrolledAlready = false;
  };

  onTouchMove = (evt) => {
    // if (this.props.scrollMode !== scrollMode.FULL_PAGE) {
    //   return;
    // }

    if (this.canScroll(evt)) {
      evt.preventDefault();
      const touchEnd = evt.changedTouches[0].clientY;

      if (!this._isScrollPending && !this._isScrolledAlready) {
        if (this._touchStart > touchEnd + this._touchSensitivity) {
          this.scrollToSlide(this.state.activeSlide + 1);
        } else if (this._touchStart < touchEnd - this._touchSensitivity) {
          this.scrollToSlide(this.state.activeSlide - 1);
        }
      }
    }
  };

  onScroll = (evt) => {
    if (this._isScrollPending) {
      return;
    }

    if (this.canScroll(evt)) {
      evt.preventDefault();
      const scrollDown = (evt.wheelDelta || -evt.deltaY || -evt.detail) < 0;
      let { activeSlide } = this.state;

      if (scrollDown) {
        activeSlide++;
      } else {
        activeSlide--;
      }

      this.scrollToSlide(activeSlide);
    }
  };

  getSlidesCount = () => this.state.slidesCount;

  getSlidesNames = () => {
    let slideNames = [];
    for (let i = 0; i < this.state.slidesCount; i++) {
      slideNames.push(this.props.children[i].props.title);
    }
    return slideNames;
  };

  getCurrentSlideIndex = () => this.state.activeSlide;

  scrollNext = () => {
    this.scrollToSlide(this.state.activeSlide + 1);
  };

  scrollPrev = () => {
    this.scrollToSlide(this.state.activeSlide - 1);
  };

  scrollToSlide = (slide) => {
    if (!this._isScrollPending && slide >= 0 && slide < this.state.slidesCount) {
      const currentSlide = this.state.activeSlide;
      this.props.beforeChange({ from: currentSlide, to: slide });

      // set global active page value to current slide
      this.props.setActivePage(slide);

      this.setState({
        activeSlide: slide,
      });

      this._isScrollPending = true;
      animatedScrollTo(this._slidePositions[slide], this.props.duration, () => {
        this._isScrollPending = false;
        this._isScrolledAlready = true;
        this.props.afterChange({ from: currentSlide, to: slide });
      });
    }
  };

  canScroll = (event) => {
    return event.target.closest(".no-scroll") === null;
  };

  renderControls() {
    const { controls, controlsProps } = this.props;
    if (!controls) {
      return null;
    }

    const controlsBasicProps = {
      open: this.props.open,
      setOpen: this.props.setOpen,
      getCurrentSlideIndex: this.getCurrentSlideIndex,
      //onNext: this.scrollNext,
      //onPrev: this.scrollPrev,
      scrollToSlide: this.scrollToSlide,
      slidesCount: this.getSlidesCount(),
      slidesNames: this.getSlidesNames(),
    };

    if (controls === true) {
      return <ControlMenu className="full-page-controls" {...controlsBasicProps} {...controlsProps} />;
    }

    const CustomControls = controls;
    return <CustomControls {...controlsBasicProps} {...controlsProps} />;
  }

  render() {
    return (
      <div id="full-page" className="full-page" style={{ height: this.state.height }}>
        {this.renderControls()}
        {this.props.children}
      </div>
    );
  }
}

FullPage.propTypes = {
  afterChange: PropTypes.func,
  beforeChange: PropTypes.func,
  children: PropTypes.node.isRequired,
  controls: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.func]),
  controlsProps: PropTypes.object,
  duration: PropTypes.number,
  initialSlide: PropTypes.number,
};

FullPage.defaultProps = {
  afterChange: () => {},
  beforeChange: () => {},
  controls: false,
  controlsProps: {},
  duration: 400,
  initialSlide: 0,
};
