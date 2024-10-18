import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(0);
  const [colorScheme, setColorScheme] = useState("light");

  /**
   * get the active page index
   */
  const isActive = (index) => {
    return activePage === index;
  };

  /**
   * toggle the color scheme
   */
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  /**
   * tracks
   */
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, updateCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackCover, setCurrentTrackCover] = useState(null);

  const play = () => {
    console.log("play");
    setIsPlaying(true);
  };

  const pause = () => {
    console.log("pause");
    setIsPlaying(false);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const setCurrentTrack = (track) => {
    updateCurrentTrack(track);
    setCurrentTrackIndex(track.id);
    setCurrentTrackCover(`${import.meta.env.VITE_COVERS_PATH}${track.cover}`);
  };

  const setNextTrackIndex = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const setPreviousTrackIndex = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const playTrack = (track) => {
    setCurrentTrack(track);
    play();
    console.log(">>> Playing Track:", track.name);
  };

  const trackIsPlaying = (id) => {
    if (currentTrack && isPlaying) {
      return currentTrack.id === id;
    }
    return false;
  };

  /**
   * Load playlist from db.json
   */
  const getPlaylist = async () => {
    console.log(">>> Fetching playlist...");
    setLoadingPlaylist(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_FILES_URL}db.json`);
      if (!response.ok) throw new Error("Failed to fetch playlist");
      const data = await response.json();
      setPlaylist(data);
      console.log(">>> Playlist fetched:", data);
    } catch (error) {
      console.error("!!! Error fetching playlist:", error.message);
      throw new Error("Error fetching playlist:", error);
    } finally {
      setLoadingPlaylist(false);
    }
  };

  /**
   * Load playlist on mount
   */
  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loadingPlaylist,
        activePage,
        currentTrack,
        currentTrackCover,
        isActive,
        setActivePage,
        play,
        isPlaying,
        pause,
        setCurrentTrack,
        setIsPlaying,
        playlist,
        togglePlay,
        setPlaylist,
        setNextTrackIndex,
        setPreviousTrackIndex,
        playTrack,
        trackIsPlaying,
        toggleColorScheme,
        colorScheme,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
