import Section from "@/components/Section";
import Playlist from "@/components/Playlist";
import Polygons from "@/assets/backgrounds/lines.jpg";

const Tracks = () => {
  return (
    <Section sectionName="section-2 section-tracks" withLogo wallpaper={Polygons} className="">
      <div className="flex md:gap-6 xl:gap-20 flex-col xl:flex-row items-center justify-center w-full md:w-9/12 p-4 md:p-0 md:pb-28 xl:pb-32 h-full ">
        <div className="w-full xl:w-1/3 2xl:w-1/2">
          <h1 className="">innerstorm's Tracks</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aliquam quod exercitationem. Iste ratione
            quis deleniti quia accusamus eligendi laboriosam voluptatem eveniet minus, numquam voluptatum suscipit
            vitae. Temporibus, nihil? Deleniti voluptatem exercitationem nemo doloremque sint vel ab corrupti doloribus
            voluptate?
          </p>
        </div>
        <div className="w-full xl:w-2/3 2xl:w-1/2 glass no-scroll overflow-y-auto overflow-x-hidden xl:p-6 md:max-h-[70vh] fade-top">
          <Playlist playlistName="tracks" columns={["cover", "title", "genre", "length"]} />
        </div>
      </div>
    </Section>
  );
};

export default Tracks;
