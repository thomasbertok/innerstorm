import Section from "@/components/Section";
import Playlist from "@/components/Playlist";
import Accordion from "@/components/Accordion";
import Background from "@/assets/backgrounds/tom3_1.jpg";

const Mixes = () => {
  return (
    <Section sectionName="section-2 section-mixes" withLogo wallpaper={Background} className="">
      <div className="flex md:gap-6 xl:gap-20 flex-col xl:flex-row items-center xl:justify-center w-full max-h-full md:w-9/12">
        <div className="sidebar w-full xl:w-1/3 2xl:w-1/2 flex flex-col xl:gap-10 p-4">
          <h1 className="title">mixes</h1>
          <Accordion>
            <div className="flex flex-col xl:max-w-2xl lg:text-lg">
              <p>
                Here are some of the mixes I've created. I really like seamless mixing, going around the Camelot wheel,
                painting on a canvas of sounds. I prefer playing around mostly with breaks and liquid dnb.
              </p>
              <p>
                <strong
                  className="cursor-help"
                  title="Endorphins are neurotransmitters released by the pituitary gland and hypothalamus in the brain. As natural hormones, they can alleviate pain, lower stress, improve mood, and enhance your sense of well-being. The body releases endorphins when you do pleasurable activities such as eating, exercise, and sex, etc.">
                  Endorfine
                </strong>{" "}
                (as in end-or-fine) is a series of house/breaks mixes with some tracks that I really like.{" "}
                <strong
                  className="cursor-help"
                  title="Dopamine is a type of neurotransmitter and hormone. It plays a role in many important body functions, including movement, memory and pleasurable reward and motivation.">
                  Dopamine
                </strong>
                , the sister hormone of endorfine, is a pair of liquid d'n'b mixes. They are numbered, with (hopefully)
                more to come.
              </p>
              <p>
                I tend to create around themes. <strong>Midnight Express</strong> for example is meant to be listened on
                a night train while almost asleep... at least it's like it in my head. Breaking the clouds is crafted
                around the fantastic track "A break in the clouds" by James Holden, and{" "}
                <strong
                  title="“Waldeinsamkeit” is a German word without a direct English translation. It can best be translated to “the feeling of being alone in the woods.”"
                  className="cursor-help">
                  Waldeinsamkeit
                </strong>
                , while its title tries to break your tongues, its sound explores the spiritual feeling one has while
                being alone in a forest.
              </p>
            </div>
          </Accordion>
        </div>
        <div className="w-full h-full xl:w-2/3 2xl:w-1/2 glass no-scroll overflow-hidden md:max-h-[70vh] fade-top">
          <Playlist name="mixes" columns={["cover", "title", "genre", "length"]} orderBy={["title", "asc"]} />
        </div>
      </div>
    </Section>
  );
};

export default Mixes;
