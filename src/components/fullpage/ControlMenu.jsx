export const ControlMenu = ({
  className,
  currentSlideIndex,
  open,
  setOpen,
  slidesCount,
  scrollToSlide,
  slidesNames,
}) => {
  const renderSlideLinks = (currentSlideIndex) => {
    const sideLinks = [];

    for (let i = 0; i < slidesCount; i++) {
      const linkProps = {
        onClick: () => scrollToSlide(i),
        ...(currentSlideIndex === i && { className: "active-link" }),
      };

      sideLinks.push(
        <li key={i} {...linkProps}>
          <span>{slidesNames[i]}</span>
        </li>
      );
    }
    return sideLinks;
  };

  const renderMenuLinks = (currentSlideIndex) => {
    const menuLinks = [];

    for (let i = 0; i < slidesCount; i++) {
      const linkProps = {
        onClick: () => menuClick(i),
        ...(currentSlideIndex === i && { className: "active-link" }),
      };

      menuLinks.push(
        <li key={i} {...linkProps}>
          <span className="nav-item">{slidesNames[i]}</span>
        </li>
      );
    }

    return menuLinks;
  };

  const toggleMenu = () => {
    setOpen(!open);
  };

  const menuClick = (itemNumber) => {
    setOpen(false);
    setTimeout(() => {
      scrollToSlide(itemNumber);
    }, 200);
  };

  return (
    <>
      <div className={className}>
        <ul className="slide-links">{renderSlideLinks(currentSlideIndex)}</ul>
      </div>

      <div>
        <div className={`main-nav-toggle cursor-pointer ${open ? "open" : ""}`} id="nav-toggle" onClick={toggleMenu}>
          <span></span>
        </div>

        <nav className={`main-navigation no-scroll ${open ? "main-menu-open" : "hidden"}`}>
          <ul>{renderMenuLinks(currentSlideIndex)}</ul>
        </nav>
      </div>
    </>
  );
};
