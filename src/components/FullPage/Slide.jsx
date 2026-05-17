import PropTypes from "prop-types";

const Slide = ({ title, activestate, children, style, ...rest }) => {
  return (
    <div {...rest} style={{ ...style }}>
      {children}
    </div>
  );
};

Slide.isSlideOfFullpage = true;

Slide.propTypes = {
  title: PropTypes.string.isRequired,
  activestate: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

export default Slide;
