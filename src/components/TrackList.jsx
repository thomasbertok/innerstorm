import { Waveform } from "./Waveform";

const tracks = [
  {
    name: "nightingale",
    url: "/mp3/nightingale.mp3",
  },
  {
    name: "nightingale",
    url: "/mp3/nightingale.mp3",
  },
  {
    name: "nightingale",
    url: "/mp3/nightingale.mp3",
  },
];

export const TrackList = () => {
  return (
    <div className="w-full">
      <ul className="flex flex-col gap-8">
        <li>
          <Waveform trackData={tracks[0]} />
        </li>
        <li>
          <Waveform trackData={tracks[1]} />
        </li>
      </ul>
    </div>
  );
};
