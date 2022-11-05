import { useState, createContext, useEffect } from "react";

export const GlobalContext = createContext();

const theme = {
  DARK: "dark",
  LIGHT: "light",
};

export const GlobalStore = () => {
  const [selectedTheme, setSelectedTheme] = useState(theme.WHITE);
  const [secondaryTheme, setSecondaryTheme] = useState(theme.WHITE);
  const [data, setData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const toggleSecondaryTheme = () => {
    setSecondaryTheme((currentTheme) =>
      currentTheme === theme.LIGHT ? theme.DARK : theme.LIGHT
    );
  };

  const toggleTheme = () => {
    setSelectedTheme((currentTheme) =>
      currentTheme === theme.LIGHT ? theme.DARK : theme.LIGHT
    );
  };

  const fetchData = (name = "ditto") => {
    setIsLoadingData(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((responseData) => {
        setIsLoadingData(false);
        setData(responseData);
      })
      .catch(() => setIsLoadingData(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    selectedTheme,
    toggleTheme,
    data,
    isLoadingData,
    fetchData,
    secondaryTheme,
    toggleSecondaryTheme
  };
};

const GlobalProvider = (children) => {
  return <GlobalContext.Provider value={GlobalStore()} {...children} />;
};

export default GlobalProvider;
