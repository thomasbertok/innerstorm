const Slide = ({ title, activestate, children, style, ...rest }) => {
  return (
    <div {...rest} style={{ ...style }}>
      {children}
    </div>
  );
};

Slide.isSlideOfFullpage = true;

export default Slide;
