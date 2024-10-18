export const fetchPeakData = async (trackSlug) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_PEAKFILES_URL}${trackSlug}.json`);
    if (!response.ok) throw new Error("Failed to fetch audio JSON");
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching peak data:", error);
    throw new Error("Error fetching peak data:", error);
  }
};
