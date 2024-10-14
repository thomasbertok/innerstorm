import React from 'react';
import PropTypes from 'prop-types';

export default class Controls extends React.Component {
  
  renderSlideLinkButtons(currentSlideIndex) {
    const { slidesCount, scrollToSlide, slidesNames } = this.props;
    const slideLinks = [];
    
    for (let i = 0; i < slidesCount; i++) {
      const buttonProps = {
        disabled: currentSlideIndex === i,
        key: i,
        onClick: () => scrollToSlide(i),
      };
      slideLinks.push(<button type="button" {...buttonProps}>{slidesNames[i]}</button>);
    }
    
    return slideLinks;
  }


  renderSlideLinks(currentSlideIndex) {
    const { slidesCount, scrollToSlide, slidesNames } = this.props;    
    const sideLinks = [];
    for (let i = 0; i < slidesCount; i++) {
        const linkProps = {
            key: i,
            onClick: () => scrollToSlide(i),
            ...(currentSlideIndex === i) && { className: "active-link" },
        };

        sideLinks.push(<li {...linkProps}><span>{slidesNames[i]}</span></li>);
    }
    return sideLinks
  }


  renderMenuLinks(currentSlideIndex) {
    const { slidesCount, scrollToSlide, slidesNames } = this.props;
    const menuLinks = []

    for (let i = 0; i < slidesCount; i++) {
      const linkProps = {
        key: i,
        onClick: () => scrollToSlide(i),
        ...(currentSlideIndex === i) && { className: "active-link" },
      };
    
      menuLinks.push(<li {...linkProps}><span className='nav-item'>{slidesNames[i]}</span></li>);
    }

    return menuLinks
  }

  toggleMenu() {
    //const { setOpen } = this.props;

    console.log(props);

    //setOpen(!this.props.open);
  }


  render() {

    const {
      getCurrentSlideIndex, className, open, setOpen
    } = this.props;

    //console.log('control props ', this.props);

    const currentSlideIndex = getCurrentSlideIndex();
    
    return (
      <>
        <div className={className}>
            <ul className='slide-links'>
                {this.renderSlideLinks(currentSlideIndex)}
            </ul>
        </div>
        
        <div>
            <div className={`main-nav-toggle cursor-pointer ${open ? 'open': ''}`} id="nav-toggle" onClick={this.toggleMenu}>
                <span></span>
            </div>

            <nav className={`main-navigation ${open ? "main-menu-open" : "hidden"}`}>
                <ul>
                    {this.renderMenuLinks(currentSlideIndex)}
                </ul>
            </nav>
        </div>
      </>
    );
  }
}

Controls.propTypes = {
  className: PropTypes.string,
  getCurrentSlideIndex: PropTypes.func.isRequired,
  //onNext: PropTypes.func.isRequired,
  //onPrev: PropTypes.func.isRequired,
  scrollToSlide: PropTypes.func.isRequired,
  slidesCount: PropTypes.number.isRequired,
  style: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
};

Controls.defaultProps = {
  className: 'full-page-controls',
  style: {},
};
