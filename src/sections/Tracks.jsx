import { TrackList } from "@/components/TrackList";
const Tracks = () => {
  return (
    <div className="screen screen-2 page-tracks">
      <div className="tracks mx-auto flex w-8/12 flex-col">
        <h1 className="title-1">Latest Track</h1>
        <TrackList />
      </div>
    </div>
  );
};

export default Tracks;
