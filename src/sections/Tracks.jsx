import Section from "@/components/Section";
import Playlist from "@/components/Playlist";
import Background from "@/assets/backgrounds/tomtom.jpg";
import Accordion from "@/components/Accordion";
import { orderBy } from "lodash";

const Tracks = () => {
  return (
    <Section sectionName="section-2 section-tracks" withLogo wallpaper={Background} className="">
      <div className="flex md:gap-6 xl:gap-10 2xl:gap-20 flex-col xl:flex-row items-center justify-center w-full md:w-9/12 p-0 h-full">
        <div className="sidebar w-full xl:w-1/3 2xl:w-1/2 flex flex-col xl:gap-10 p-4">
          <h1 className="">innerstorm's tracks</h1>
          <Accordion>
            <div className="flex flex-col xl:max-w-2xl lg:text-lg">
              <p>
                Oh man, it's easier to program this whole website than writing down some thoughts about the music. How
                do they say? Writing about music is like dancing about architecture.
              </p>
              <p>
                Ok, I'm not a musician, I just wanted to write down some thoughts, feelings, colours, glimpses. Moments
                that deserved to be captured.
              </p>
              <p>
                Here are some of these tracks, in chronologic order, latest first. The player goes round the clock,
                check it out.
              </p>
              <p>Click the cover in the player for details...</p>
            </div>
          </Accordion>
        </div>
        <div className="w-full h-full xl:w-2/3 2xl:w-1/2 glass no-scroll overflow-hidden md:max-h-[70vh] fade-top">
          <Playlist name="tracks" columns={["cover", "title", "genre", "length"]} orderBy={["date", "desc"]} />
        </div>
      </div>
    </Section>
  );
};

export default Tracks;
