import { createContext, useState, useEffect } from "react";
import { config } from "./config.js";

const { API_KEY } = config;

const AppContext = createContext();

function AppProvider({ children }) {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => console.log(page), [page]);

  function getMovies() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}&page=${page}&type=movie`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMovies(data.Search);
      })
      .catch((error) => console.error(error));
  }

  function getMovieInfo(id) {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMovie(data);
      })
      .catch((error) => console.error(error));
  }

  function handleInputChange(event) {
    setSearch(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    getMovies();

    setPage(1);
    setSearch("");
    setMovies([]);
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
    // getMovies();
  }

  function handlePrevPage() {
    setPage((prev) => prev - 1);
    // getMovies();
  }

  function toKebabCase(str) {
    return str.toLowerCase().replace(/ /g, "-");
  }

  const value = {
    search,
    movies,
    movie,
    page,
    getMovieInfo,
    handleInputChange,
    handleFormSubmit,
    handleNextPage,
    handlePrevPage,
    toKebabCase,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
