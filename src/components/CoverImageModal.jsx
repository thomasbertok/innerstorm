import { usePlayerContext } from "@/context/PlayerContext";
import { X } from "lucide-react";

const CoverImageModal = () => {
  const { showCover, setShowCover, currentTrackCover } = usePlayerContext();
  if (!showCover) return null;
  return (
    <div className="cover-image-modal" onClick={() => setShowCover(false)}>
      <img src={currentTrackCover} alt="" />
      <button className="absolute top-8 right-8">
        <X size={24} />
      </button>
    </div>
  );
};

export default CoverImageModal;
