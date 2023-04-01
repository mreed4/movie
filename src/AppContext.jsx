import { createContext, useState } from "react";
import { config } from "./config.js";

const { API_KEY } = config;

const AppContext = createContext();

function AppProvider({ children }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  function getMovies() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.Search);
      })
      .catch((error) => console.error(error));
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    getMovies();
    setSearch("");
    setMovies([]);
  }

  const value = { search, movies, page, setPage, handleInputChange, handleFormSubmit };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
