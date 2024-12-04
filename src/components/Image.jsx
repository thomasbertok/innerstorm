import { useState } from "react";

const Image = ({ src, alt, className, fallbackImage = "true", ...rest }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fallback = "music/cover/default.jpg";
  const fallbackText = "Default image";

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <>
      {!error && fallbackImage && (
        <img
          src={error ? fallback : src}
          alt={error ? fallbackText : alt}
          className={className}
          onLoad={handleLoad}
          onError={handleError}
          {...rest}
        />
      )}
    </>
  );
};

export default Image;
