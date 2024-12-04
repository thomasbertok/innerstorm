import { usePlayerContext } from "@/context/PlayerContext";
import Image from "@/components/Image";
import { X } from "lucide-react";

const CoverImageModal = () => {
  const { showCover, setShowCover, currentTrack } = usePlayerContext();
  if (!showCover || !currentTrack) return null;
  const currentSlug = `${import.meta.env.VITE_PUBLIC_URL}${import.meta.env.VITE_COVERS_PATH}${currentTrack.slug}`;
  return (
    <div className="cover-image-modal" onClick={() => setShowCover(false)}>
      <div className="flex gap-0 w-10/12 xl:w-8/12 4xl:w-1/2 items-center justify-center">
        <Image src={`${currentSlug}.jpg`} alt="" className="w-1/2" />
        <Image src={`${currentSlug}_text.jpg`} alt="" className="w-1/2" />
      </div>
      <button className="absolute top-8 right-8">
        <X size={24} />
      </button>
    </div>
  );
};

export default CoverImageModal;
