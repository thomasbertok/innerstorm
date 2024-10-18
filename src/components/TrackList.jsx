import { useState, useEffect } from "react";
import WaveSurf from "./WaveSurf";
const tracks_list = [
  {
    id: 1,
    name: "mangata",
    url: "mangata.mp3",
  },
  {
    id: 2,
    name: "nightingale",
    url: "nightingale.mp3",
  },
  // {
  //   id: 3,
  //   name: "Endorfine 1",
  //   url: "/mp3/innerstorm - endorfine 1.mp3",
  // },
];

export const TrackList = () => {
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTracks(tracks_list);
    setLoading(false);
  }, []);

  return (
    <div className="w-full">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="flex flex-col gap-8">
          {tracks.map((track) => (
            <li key={track.id}>{/* <WaveSurf trackData={track} /> */}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
