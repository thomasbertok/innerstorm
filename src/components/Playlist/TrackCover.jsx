import React from "react";

const TrackCover = ({ trackData }) => {
  // TODO: needs refactoring, no ON ERROR... it shows up in console!!!
  return (
    <img
      src={`${import.meta.env.VITE_COVERS_PATH}${trackData.slug}.jpg`}
      alt={trackData.title}
      onError={(e) => {
        e.target.onError = null;
        e.target.src = "music/cover/default.jpg";
      }}
      loading="lazy"
    />
  );
};

export default TrackCover;
