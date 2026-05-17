import { useState } from "react";
import PropTypes from "prop-types";

const Image = ({ src, alt, className, fallbackImage = "true", ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fallback = `${import.meta.env.VITE_COVERS_PATH}/default.jpg`;
  const fallbackText = "Default image";

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <img
      src={error && fallbackImage ? fallback : src}
      alt={error && fallbackImage ? fallbackText : alt}
      className={className}
      onLoad={handleLoad}
      onError={handleError}
      {...rest}
    />
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  fallbackImage: PropTypes.bool,
};

export default Image;
