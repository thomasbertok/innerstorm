import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(0);
  const [colorScheme, setColorScheme] = useState("light");

  /**
   * get the active page index
   */
  const isActivePage = (index) => {
    return activePage === index;
  };

  /**
   * toggle the color scheme
   */
  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "light" ? "dark" : "light");
  };

  /**
   * TRACKS
   */
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, updateCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState(null);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackCover, setCurrentTrackCover] = useState(null);

  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeat, setIsRepeat] = useState(0);

  const play = () => {
    console.log("play");
    setIsPlaying(true);
  };

  const pause = () => {
    console.log("pause");
    setIsPlaying(false);
  };

  // const togglePlay = () => setIsPlaying(!isPlaying);

  /**
   * Set the given track as the current track
   * Set index of current track
   * Set cover
   */
  const setCurrentTrack = (track) => {
    console.log("setCurrentTrack:", track);
    if (track) {
      updateCurrentTrack(track);
      setCurrentTrackIndex(playlist.indexOf(track));
      setCurrentTrackCover(`${import.meta.env.VITE_COVERS_PATH}${track.cover}`);
    } else {
      updateCurrentTrack(null);
      setCurrentTrackIndex(0);
      setCurrentTrackCover(null);
    }
  };

  /**
   * Set the given track as the current track
   * Play the track
   */
  const playTrack = (track) => {
    setCurrentTrack(track);
    play();
    console.log(">>> Playing Track:", track.name);
  };

  /**
   * Check if the given track.id is currently playing
   */
  const trackIsPlaying = (id) => {
    if (currentTrack && isPlaying) {
      return currentTrack.id === id;
    }
    return false;
  };

  /**
   * SORT PLAYLIST ALPHABETICALLY
   */
  const sortPlaylist = (data, by, ordering) => {
    if (!data) return [];

    // TODO: sort by date descending
    if (by === "name" && ordering === "asc") {
      return data.sort((a, b) => a.slug.localeCompare(b.slug));
    } else {
      return data;
    }
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
      setPlaylist(sortPlaylist(data));
      console.log(">>> Playlist fetched:", data);
    } catch (error) {
      console.error("!!! Error fetching playlist:", error.message);
      throw new Error("Error fetching playlist:", error);
    } finally {
      setLoadingPlaylist(false);
    }
  };

  /**
   * auto set next track when current track ends
   */
  const setNextTrack = () => {
    let wasPlaying = isPlaying;
    let nextTrack = currentTrack;
    pause();

    if (isShuffled) {
      nextTrack = playlist[Math.floor(Math.random() * playlist.length)];
    } else {
      switch (isRepeat) {
        case 2: // repeat all | circle playlist
          nextTrack = (currentTrackIndex + 1) % playlist.length;
          break;
        default: // repeat off | go to next track if not last
          if (currentTrackIndex < playlist.length - 1) {
            nextTrack = playlist[currentTrackIndex + 1];
          } else {
            // last track, no repeat is on
            wasPlaying = false;
          }
          break;
      }
    }

    // set current track to the new one
    setCurrentTrack(nextTrack);
    setIsPlaying(nextTrack !== null && wasPlaying);
  };

  /**
   * onClickNextTrack
   */
  const clickNextTrack = () => {
    let nextTrack = currentTrack;
    const wasPlaying = isPlaying;
    pause();
    if (isShuffled) {
      nextTrack = playlist[Math.floor(Math.random() * playlist.length)];
    } else {
      if (isRepeat === 2) {
        // circle playlist
        nextTrack = playlist[(currentTrackIndex + 1) % playlist.length];
      } else {
        // go to next track if not last
        if (currentTrackIndex < playlist.length - 1) {
          nextTrack = playlist[currentTrackIndex + 1];
        }
      }
    }

    // set current track to the new one
    setCurrentTrack(nextTrack);
    setIsPlaying(nextTrack !== null && wasPlaying);
  };

  /**
   * onClickPrevTrack
   */
  const clickPrevTrack = () => {
    let prevTrack = currentTrack;
    const wasPlaying = isPlaying;
    pause();

    if (isShuffled) {
      prevTrack = playlist[Math.floor(Math.random() * playlist.length)];
    } else {
      if (isRepeat === 2) {
        // circle playlist
        prevTrack = playlist[(currentTrackIndex - 1 + playlist.length) % playlist.length];
      } else {
        // go to previous track if not first
        if (currentTrackIndex > 0) {
          prevTrack = playlist[currentTrackIndex - 1];
        }
      }
    }

    // set current track to the new one
    setCurrentTrack(prevTrack);
    setIsPlaying(prevTrack !== null && wasPlaying);
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
        activePage,
        colorScheme,
        loadingPlaylist,
        currentTrack,
        currentTrackCover,
        isActivePage,
        setActivePage,
        play,
        isPlaying,
        pause,
        setCurrentTrack,
        setIsPlaying,
        playlist,
        setPlaylist,
        setNextTrack,
        playTrack,
        trackIsPlaying,
        toggleColorScheme,
        isShuffled,
        setIsShuffled,
        isRepeat,
        setIsRepeat,
        clickNextTrack,
        clickPrevTrack,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
