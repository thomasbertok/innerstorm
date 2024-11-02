import { createContext, useContext, useEffect, useState } from "react";
import useKeyboard from "@/hooks/useKeyboard";

const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, updateCurrentTrack] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [activePlaylistName, setActivePlaylistName] = useState(null);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackCover, setCurrentTrackCover] = useState(null);
  const [volume, setVolume] = useState(0.5);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeat, setIsRepeat] = useState(0);

  //   const play = () => {
  //     console.log("▶ play");
  //     setIsPlaying(true);
  //   };

  //   const pause = () => {
  //     console.log("⏸️  pause");
  //     setIsPlaying(false);
  //   };

  /**
   * Set the given track as the current track
   * Set index of current track
   * Set cover
   */
  const setCurrentTrack = (track) => {
    // console.log(">>> Set Current Track:", track);
    if (track) {
      updateCurrentTrack(track);
      setCurrentTrackIndex(playlists[activePlaylistName].indexOf(track));
      setCurrentTrackCover(`${import.meta.env.VITE_COVERS_PATH}${track.slug}.jpg`);
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
    setIsPlaying(true);
    console.log("▶ Playing Track:", track.title);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
    console.log("⏸️  Pausing Track");
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
   * SORT PLAYLIST
   * TODO: sort by date descending
   */
  const sortPlaylist = (data, sortBy = "name", ordering = "asc") => {
    if (!data) return [];
    if (sortBy === "title" && ordering === "asc") {
      return data.sort((a, b) => a.slug.localeCompare(b.slug));
    } else {
      return data;
    }
  };

  /**
   * Load playlist from db.json
   */

  const getPlaylists = async () => {
    // console.log(">>> Fetching playlists...");
    setLoadingPlaylist(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_FILES_URL}${import.meta.env.VITE_PLAYLIST_JSON}`);
      if (!response.ok) throw new Error("Failed to fetch playlist");
      const data = await response.json();
      setPlaylists(data);
      setActivePlaylistName(Object.keys(data)[0]);
      setCurrentTrack(data[Object.keys(data)[0]][0]);
      // console.log(">>> Success:", data);
    } catch (error) {
      console.error("!!! Error fetching playlist:", error.message);
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
    const currentPlaylist = playlists[activePlaylistName];
    //pause();
    setIsPlaying(false);

    if (isShuffled) {
      nextTrack = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];
    } else {
      switch (isRepeat) {
        case 2: // repeat all | circle playlist
          nextTrack = (currentTrackIndex + 1) % currentPlaylist.length;
          break;
        default: // repeat off | go to next track if not last
          if (currentTrackIndex < currentPlaylist.length - 1) {
            nextTrack = currentPlaylist[currentTrackIndex + 1];
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
    const currentPlaylist = playlists[activePlaylistName];
    // pause();
    setIsPlaying(false);

    if (!currentTrack) return;
    if (!currentPlaylist) return;

    if (isShuffled) {
      nextTrack = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];
    } else {
      if (isRepeat === 2) {
        // circle playlist
        nextTrack = currentPlaylist[(currentTrackIndex + 1) % currentPlaylist.length];
      } else {
        // go to next track if not last
        if (currentTrackIndex < currentPlaylist.length - 1) {
          nextTrack = currentPlaylist[currentTrackIndex + 1];
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
    const currentPlaylist = playlists[activePlaylistName];
    // pause();
    setIsPlaying(false);

    if (!currentTrack) return;
    if (!currentPlaylist) return;

    if (isShuffled) {
      prevTrack = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];
    } else {
      if (isRepeat === 2) {
        // circle playlist
        prevTrack = currentPlaylist[(currentTrackIndex - 1 + currentPlaylist.length) % currentPlaylist.length];
      } else {
        // go to previous track if not first
        if (currentTrackIndex > 0) {
          prevTrack = currentPlaylist[currentTrackIndex - 1];
        }
      }
    }

    // set current track to the new one
    setCurrentTrack(prevTrack);
    setIsPlaying(prevTrack !== null && wasPlaying);
  };

  /**
   * TODO: check if this way is better
   * a more elegant wy that seaparates finding the next index from setting the track
   * but it does not cover the autoNext part, only the clicking
   * ChatGPT
   */

  /*
  const getNextTrackIndex = () => {
    if (isShuffled) return Math.floor(Math.random() * playlist.length);
    if (isRepeat === 2) return (currentTrackIndex + 1) % playlist.length;
    return currentTrackIndex < playlist.length - 1 ? currentTrackIndex + 1 : -1;
  };

  const getPreviousTrackIndex = () => {
    if (isShuffled) return Math.floor(Math.random() * playlist.length);
    if (isRepeat === 2) return (currentTrackIndex - 1 + playlist.length) % playlist.length;
    return currentTrackIndex > 0 ? currentTrackIndex - 1 : -1;
  };

  const changeTrack = (trackIndex) => {
    const track = playlist[trackIndex] || null;
    updateCurrentTrack(track, trackIndex);
    setIsPlaying(track !== null);
  };

  const clickNextTrack = () => changeTrack(getNextTrackIndex());
  const clickPrevTrack = () => changeTrack(getPreviousTrackIndex());
  */

  /**
   * Load playlist on mount
   * TODO: load playlist on first "activePage"
   */
  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        // play,
        // pause,
        currentTrack,
        setCurrentTrack,
        currentTrackCover,
        playlists,
        setPlaylists,
        setIsPlaying,
        loadingPlaylist,
        isPlaying,
        playTrack,
        pauseTrack,
        trackIsPlaying,
        isShuffled,
        setIsShuffled,
        isRepeat,
        setIsRepeat,
        setNextTrack,
        clickNextTrack,
        clickPrevTrack,
        volume,
        setVolume,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
