import { useRef } from "react";
import VideoJS from "@/components/VideoPlayer/VIdeoJS";

const Videos = () => {
  const playerRef = useRef(null);

  const videoOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "http://localhost:8080/music/videos/video.mp4",
        type: "video/mp4",
      },
      //   {
      //     src: "http://localhost:8080/music/videos/stay-still.mp4",
      //     type: "video/webm",
      //   },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  return (
    <div className="screen screen-2 page-tracks">
      <div className="tracks mx-auto flex w-8/12 flex-col">
        <h1 className="title-1">Videos</h1>

        <VideoJS options={videoOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};

export default Videos;
