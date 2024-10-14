const Slide = ({ title, activestate, children, style, ...rest }) => {
  return (
    <div className={`full-page-slide ${activestate ? "active" : "inactive"}`} {...rest} style={{ ...style }}>
      {children}
    </div>
  );
};

Slide.isSlideOfFullpage = true;

export default Slide;
