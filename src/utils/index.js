// converts seconds int to mm:ss
export const formatTime = (seconds) => [seconds / 60, seconds % 60].map((v) => `0${Math.floor(v)}`.slice(-2)).join(":");

// debounce | wait time for finishing a function
// from https://davidwalsh.name/javascript-debounce-function
export const debounce = (func, time) => {
  time = time || 100;
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, time);
  };
};

/**
 * fetch the json for the playlistname and order it by dat or title
 * @returns playlist
 */
export const getPlaylist = async (playlistName, sortBy, order) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_FILES_URL}/${playlistName}.json`);
    if (!response.ok) {
      console.error("Failed to fetch playlist.", playlistName);
      return null;
    }
    const data = await response.json();
    return data && data.length > 0 ? sortPlaylist(data, sortBy, order) : null;
  } catch (error) {
    console.error("!!! Error fetching playlist:", error.message);
  }
};

/**
 * sort the playlist by title or date
 * @returns playlist
 */
export const sortPlaylist = (playlist, sortBy, order = "asc") => {
  return playlist.sort((a, b) => {
    let comparison = 0;

    if (sortBy === "title") {
      // Compare titles alphabetically (case insensitive)
      comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    } else if (sortBy === "date") {
      // Handle "Unknown" dates
      const yearA = a.year === "Unknown" ? null : parseInt(a.year, 10);
      const yearB = b.year === "Unknown" ? null : parseInt(b.year, 10);

      if (yearA === null && yearB === null) {
        comparison = 0; // Both unknown, consider equal
      } else if (yearA === null) {
        comparison = order === "asc" ? 1 : -1; // Treat unknown as latest or earliest
      } else if (yearB === null) {
        comparison = order === "asc" ? -1 : 1; // Treat unknown as latest or earliest
      } else {
        comparison = yearA - yearB; // Compare valid years
      }
    }

    // Adjust for descending order
    return order === "desc" ? -comparison : comparison;
  });
};
