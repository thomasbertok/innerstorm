import React from "react";

const TrackCover = ({ trackData }) => {
    return (
        <img
            src={`${import.meta.env.VITE_COVERS_PATH}${trackData.slug}.jpg`}
            alt={trackData.title}
            onError={(e) => {
                e.target.onError = null;
                e.target.src = `${import.meta.env.VITE_COVERS_PATH}default.jpg`;
            }}
            loading="lazy"
        />
    );
};

export default TrackCover;
