import PropTypes from "prop-types";

const TrackCover = ({ trackData }) => {
  return (
    <img
      src={`${import.meta.env.VITE_COVERS_PATH}${trackData.slug}.jpg`}
      alt={trackData.title}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = `${import.meta.env.VITE_COVERS_PATH}default.jpg`;
      }}
      loading="lazy"
    />
  );
};

TrackCover.propTypes = {
  trackData: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TrackCover;
