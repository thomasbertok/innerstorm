import React from "react";
import { Sun, Moon } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const ThemeSwitcher = () => {
  const { colorScheme, toggleColorScheme } = useAppContext();
  return (
    <button className="theme-switcher text-zinc-500 hover:text-zinc-100 cursor-pointer" onClick={toggleColorScheme}>
      {colorScheme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeSwitcher;
