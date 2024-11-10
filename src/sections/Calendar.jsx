import Section from "@/components/Section";
import Accordion from "@/components/Accordion";
import CalendarPlaylist from "@/components/CalendarPlaylist";
import Polygons from "@/assets/backgrounds/innerstorm.jpeg";

const CalendarMixes = () => {
  return (
    <Section sectionName="section-3 section-calendar" withLogo wallpaper={Polygons} className="">
      <div className="flex items-start p-4 lg:p-0 w-full md:w-10/12 2xl:w-9/12 md:p-0 md:pb-32 xl:pb-32 h-full">
        <div className="w-full flex flex-col lg:flex-row gap-4 2xl:gap-10 h-full items-center">
          <div className="sidebar flex flex-col items-start xl:gap-10 w-full 2xl:w-1/3 4xl:pr-16  ">
            <h1 className="">The Calendar Mixes</h1>
            <Accordion>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aliquam quod exercitationem. Iste
                ratione quis deleniti quia accusamus eligendi laboriosam voluptatem eveniet minus, numquam voluptatum
                suscipit vitae. Temporibus, nihil? Deleniti voluptatem exercitationem nemo doloremque sint vel ab
                corrupti doloribus voluptate? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore,
                repudiandae? Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque accusamus, voluptatum
                accusantium, animi similique reprehenderit quibusdam quidem adipisci eum repudiandae incidunt impedit
                vero nulla rerum aut atque? Nostrum aliquam, eveniet adipisci similique odio facilis. Delectus veniam
                exercitationem omnis quae nam officiis cum. Molestiae adipisci sed architecto debitis quis, excepturi
                quod?
              </p>
            </Accordion>
          </div>
          <div className="flex items-center overflow-hidden w-full 2xl:w-2/3 h-full">
            <CalendarPlaylist playlistName="calendar" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CalendarMixes;
