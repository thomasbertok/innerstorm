import { createContext } from "react";

export const AppContext = createContext({
  currentTrack: null,
  setCurrentTrack: () => {},

  isPlaying: false,
  setIsPlaying: () => {},
});
