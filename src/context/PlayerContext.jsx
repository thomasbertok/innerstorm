import { createContext, useContext, useEffect, useState } from "react";
const PlayerContext = createContext();

export const PlayerContextProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, updateCurrentTrack] = useState(null);
  const [currentTrackCover, setCurrentTrackCover] = useState(null);
  // show the cover in a lightbox when clicking on it in main player
  const [showCover, setShowCover] = useState(false);

  // set volume to 50%
  const [volume, setVolume] = useState(0.5);
  // set shuffle to false
  const [isShuffled, setIsShuffled] = useState(false);
  // set repeat to repeat all
  const [isRepeat, setIsRepeat] = useState(2);

  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [loadingPlaylist, setLoadingPlaylist] = useState(false);

  /**
   * Set the given track as the current track without playing it
   * Set index of current track
   * Set cover to current track
   */
  const setCurrentTrack = (playlist, track) => {
    if (track) {
      updateCurrentTrack(track);
      setCurrentPlaylist(playlist);
      setCurrentTrackCover(`${import.meta.env.VITE_COVERS_PATH}${track.slug}.jpg`);
    } else {
      updateCurrentTrack(null);
      setCurrentTrackCover(null);
    }
  };

  /**
   * update current playlist
   * set current track
   * play the track
   */
  const playTrack = (playlist, track) => {
    // set track to play
    setCurrentTrack(playlist, track);
    // start playing
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
   * auto set next track when current track ends
   */
  const setNextTrack = () => {
    if (!currentTrack) return;
    if (!currentPlaylist) return;

    let wasPlaying = isPlaying;
    let nextTrack = currentTrack;
    setIsPlaying(false);

    const currentIndex = currentPlaylist.indexOf(currentTrack);

    // SHUFFLE AND REPEAT SETTINGS DISABLED
    // if (isShuffled) {
    //   nextTrack = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];
    // } else {
    //   switch (isRepeat) {
    //     case 2: // repeat all | circle playlist
    //       nextTrack = (currentIndex + 1) % currentPlaylist.length;
    //       break;
    //     default: // repeat off | go to next track if not last
    //       if (currentIndex < currentPlaylist.length - 1) {
    //         nextTrack = currentPlaylist[currentIndex + 1];
    //       } else {
    //         // last track, no repeat is on
    //         wasPlaying = false;
    //       }
    //       break;
    //   }
    // }

    // circle playlist
    nextTrack = currentPlaylist[(currentIndex + 1) % currentPlaylist.length];
    // set current track to the new one
    setCurrentTrack(currentPlaylist, nextTrack);
    setIsPlaying(nextTrack !== null && wasPlaying);
  };

  /**
   * onClickNextTrack
   */
  const clickNextTrack = () => {
    if (!currentTrack) return;
    if (!currentPlaylist) return;

    let nextTrack = currentTrack;
    const wasPlaying = isPlaying;
    setIsPlaying(false);

    const currentIndex = currentPlaylist.indexOf(currentTrack);

    // SHUFFLE AND REPEAT SETTINGS DISABLED
    // if (isShuffled) {
    //   nextTrack = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];
    // } else {
    //   if (isRepeat === 2) {
    //     // circle playlist
    //     nextTrack = currentPlaylist[(currentIndex + 1) % currentPlaylist.length];
    //   } else {
    //     // go to next track if not last
    //     if (currentIndex < currentPlaylist.length - 1) {
    //       nextTrack = currentPlaylist[currentIndex + 1];
    //     }
    //   }
    // }

    nextTrack = currentPlaylist[(currentIndex + 1) % currentPlaylist.length];
    // set current track to the new one
    setCurrentTrack(currentPlaylist, nextTrack);
    setIsPlaying(nextTrack !== null && wasPlaying);
  };

  /**
   * onClickPrevTrack
   */
  const clickPrevTrack = () => {
    if (!currentTrack) return;
    if (!currentPlaylist) return;

    let prevTrack = currentTrack;
    const wasPlaying = isPlaying;
    setIsPlaying(false);

    const currentIndex = currentPlaylist.indexOf(currentTrack);

    // SHUFFLE AND REPEAT SETTINGS DISABLED
    // if (isShuffled) {
    //   prevTrack = currentPlaylist[Math.floor(Math.random() * currentPlaylist.length)];
    // } else {
    //   if (isRepeat === 2) {
    //     // circle playlist
    //     prevTrack = currentPlaylist[(currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length];
    //   } else {
    //     // go to previous track if not first
    //     if (currentIndex > 0) {
    //       prevTrack = currentPlaylist[currentIndex - 1];
    //     }
    //   }
    // }

    prevTrack = currentPlaylist[(currentIndex - 1 + currentPlaylist.length) % currentPlaylist.length];
    // set currentTrack to the new one
    setCurrentTrack(currentPlaylist, prevTrack);
    setIsPlaying(prevTrack !== null && wasPlaying);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        setCurrentTrack,
        currentTrackCover,
        isPlaying,
        setIsPlaying,
        loadingPlaylist,
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
        showCover,
        setShowCover,
      }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  return useContext(PlayerContext);
};
