import Section from "@/components/Section";
import Magic from "@/assets/backgrounds/magic1.jpg";

const About = () => {
  return (
    <Section
      sectionName="section-about"
      glass
      withLogo
      className="p-10 md:w-8/12 xl:w-6/12 max-w-[860px]"
      wallpaper={Magic}>
      <h1 className="mb-6">innerstorm</h1>

      <p className="font-mono text-sm md:text-lg">
        &gt; Help me write an introduction for an enthusiastic music producer and DJ's website. The text should focus on
        the exploration of new sounds, expressing emotions through music, and breaking free from the limitations of
        specific genres, allowing the music to evolve naturally. Please avoid making it sound like an action movie
        trailer.
        <br />
        <br />
        &gt; &hellip;
      </p>
    </Section>
  );
};

export default About;
