import Section from "@/components/Section";
import Accordion from "@/components/Accordion";
import CalendarPlaylist from "@/components/CalendarPlaylist";
import Polygons from "@/assets/backgrounds/innerstorm.jpeg";

const CalendarMixes = () => {
  return (
    <Section sectionName="section-3 section-calendar" withLogo wallpaper={Polygons} className="">
      <div className="flex items-start p-4 lg:p-0 w-full md:w-9/12 md:p-0 h-full">
        <div className="w-full flex flex-col 2xl:flex-row gap-6 2xl:gap-10 h-full items-center justify-center">
          <div className="sidebar flex flex-col lg:flex-row 2xl:flex-col items-start xl:gap-10 w-full 2xl:w-1/3 4xl:pr-16">
            <h1 className="title">calendar mixes</h1>
            <Accordion className="w-full hidden lg:flex">
              <div className="flex flex-col 2xl:max-w-2xl 2xl:text-lg">
                <p>
                  The twelve months project I've began in 2021. September was the first with some nice breaks tunes,
                  after that the all time favourite, liquid drum and bass, and so on.
                </p>
                <p>
                  Each month I've tried to bring a different theme, however staying in the styles I prefer. One can say
                  it's a diorama of the music I like.
                </p>
                <p>
                  These mixes are up on{" "}
                  <a
                    className="text-red-600"
                    href="https://www.youtube.com/watch?v=OHdwKc5hHCY&list=PL2Vmf-tMeSp7L-Ote7g9wkgcaeGOVdLyP"
                    target="_blank">
                    Youtube
                  </a>
                  , so you can enjoy them there too.
                </p>
              </div>
            </Accordion>
          </div>
          <div className="section-article flex items-center overflow-auto md:pb-0 w-full 2xl:h-full 2xl:w-2/3 no-scroll">
            <CalendarPlaylist playlistName="calendar" />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default CalendarMixes;
