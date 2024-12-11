import { usePlayerContext } from "@/context/PlayerContext";
import Image from "@/components/Image";
import { X } from "lucide-react";

const CoverImageModal = () => {
  const { showCover, setShowCover, currentTrack } = usePlayerContext();
  if (!showCover || !currentTrack) return null;
  const currentSlug = `${import.meta.env.VITE_PUBLIC_URL}${import.meta.env.VITE_COVERS_PATH}${currentTrack.slug}`;
  return (
    <div className="cover-image-modal" onClick={() => setShowCover(false)}>
      <div className="flex flex-col xl:flex-row gap-0 w-11/12 lg:w-9/12 xl:w-8/12 items-center justify-center">
        <Image src={`${currentSlug}.jpg`} alt="" className="flex-1 xl:max-h-[800px] xl:max-w-[800px]" />
        <Image src={`${currentSlug}_text.jpg`} alt="" className="flex-1 xl:max-h-[800px] xl:max-w-[800px]" />
      </div>
      <button className="absolute top-8 right-8">
        <X size={24} />
      </button>
    </div>
  );
};

export default CoverImageModal;
