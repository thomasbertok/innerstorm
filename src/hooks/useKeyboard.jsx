import { useEffect } from "react";

const useKeyboard = ({ key, onKeyPressed }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (key === event.key) {
        onKeyPressed(event);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
};

export default useKeyboard;
