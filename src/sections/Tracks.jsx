import Section from "@/components/Section";
import Playlist from "@/components/Playlist";
import Polygons from "@/assets/backgrounds/triangulation.jpg";

const Tracks = () => {
  return (
    <Section sectionName="section-2" withLogo wallpaper={Polygons}>
      <div className="flex gap-20 items-center justify-center w-9/12">
        <div className="flex-1">
          <h1 className="">innerstorm's Tracks</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aliquam quod exercitationem. Iste ratione
            quis deleniti quia accusamus eligendi laboriosam voluptatem eveniet minus, numquam voluptatum suscipit
            vitae. Temporibus, nihil? Deleniti voluptatem exercitationem nemo doloremque sint vel ab corrupti doloribus
            voluptate?
          </p>
        </div>
        <div className="flex-1 glass section-content no-scroll max-h-[70vh] overflow-y-auto overflow-x-hidden p-6">
          <Playlist playlistName="tracks" columns={["cover", "title", "artist", "genre", "year", "length"]} />
        </div>
      </div>
    </Section>
  );
};

export default Tracks;
