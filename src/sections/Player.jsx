import React from "react";

const songs = [
  "Endorfine 1",
  "Dopamine 1",
  "Dopamine 2",
  "Drunken Soldier",
  "Agoraphobia",
  "back2back",
  "Caveman",
  "drunken soldier",
  "Fairy Tale",
  "Faith. Restored",
  "fast forward",
  "Going Astray",
  "Hard To Be",
  "Hard Traffic",
  "Heartbeats",
  "In The Crowd (Ableton Version)",
  "In The Crowd (Fl Version)",
  "June",
  "laminar flow",
  "mangata",
  "medicine",
  "Meteor Chasers",
  "Mist",
  "Nightingale",
  "Perfect Threesome",
  "Ripple",
  "Rounders (true grinder edit)",
  "Rounders",
  "Rusty Dust",
  "Shattered Glass",
  "Sinking Slowly",
  "Sinking Slowly v01",
  "Smith Of Fate",
  "Stay Still",
  "Vasarnap",
  "Vertigo",
];

const Player = () => {
  const handleClick = (ev, index) => {
    ev.preventDefault();
    console.log("clicked", index);
  };

  return (
    <div className="screen screen-3 page-tracks">
      {/* <h1 className="title-1">Playlist</h1> */}
      <div className="glass-dark mx-auto inline-flex p-12 gap-16 w-6/12 h-[60%]">
        <div className="left-side gap-16 flex flex-col w-6/12">
          <div
            className="cover-image bg-zinc-100 rounded-xl overflow-hidden w-[320px] h-[320px]"
            style={{
              backgroundImage: `url(https://picsum.photos/800)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            {/* <img src="https://picsum.photos/800" alt="" className="w-full" /> */}
          </div>

          {/* <div className="player">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut ipsam aut aliquam odio veniam? Quas quisquam
            dicta voluptas fugiat ipsa nulla facilis harum. Consequuntur ea doloribus maxime ipsam amet. Excepturi
            debitis natus velit quibusdam quae dignissimos labore nobis iusto, distinctio inventore, facilis, nam omnis
            ut aliquid minima itaque nesciunt ducimus. Tenetur placeat natus alias repudiandae molestias porro eveniet.
            Excepturi iusto officia culpa repudiandae corrupti enim. Dignissimos, nam consequatur tempora sequi earum,
            quia enim quam obcaecati harum iure minima ex explicabo dolores autem suscipit exercitationem. Sequi beatae
            reiciendis quibusdam accusantium sed odio tenetur. Praesentium dolorem eum labore quasi consequuntur. Qui,
            impedit!
          </div> */}
        </div>

        <div className="playlist exclude-from-scrolling right-side overflow-y-auto w-6/12">
          <ul className="">
            {songs.map((text, index) => (
              <li key={index} className="">
                <a
                  href="#"
                  onClick={(ev) => handleClick(ev, index)}
                  className="flex gap-4 items-center hover:bg-zinc-800/60 rounded-tl-xl rounded-bl-xl">
                  <div className="text-sm text-zinc-600 w-[1.5rem] text-right">{index + 1}</div>
                  <div className="flex-1 p-2">{text}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Player;
