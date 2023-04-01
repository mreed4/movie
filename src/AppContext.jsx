import { createContext, useState } from "react";
import { config } from "./config.js";

const { API_KEY } = config;

const AppContext = createContext();

function AppProvider({ children }) {
  const [search, setSearch] = useState("");

  function getMovies() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error.Error));
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  }

  const value = { search, setSearch, getMovies, handleInputChange };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
