import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activePage, setActivePage] = useState(0);
  const [colorScheme, setColorScheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAccordionOpen, setAccordionOpen] = useState(false);

  /**
   * get the index of the active page
   */
  const isActivePage = (index) => {
    return activePage === index;
  };

  const toggleColorScheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <AppContext.Provider
      value={{
        activePage,
        isActivePage,
        setActivePage,
        menuOpen,
        setMenuOpen,
        colorScheme,
        setColorScheme,
        toggleColorScheme,
        isAccordionOpen,
        setAccordionOpen,
      }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAppContext = () => {
  return useContext(AppContext);
};
