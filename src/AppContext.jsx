import { createContext, useState, useEffect } from "react";
import { config } from "./config.js";

const { API_KEY } = config;
const API = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const AppContext = createContext();

function AppProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => console.log(page), [page]);

  function getMovies() {
    fetch(`${API}&s=${searchTerm}&page=${page}&type=movie`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setMovies(data.Search);
      })
      .catch((error) => console.error(error));
  }

  function getMovieInfo(id) {
    fetch(`${API}&i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovie(data);
      })
      .catch((error) => console.error(error));
  }

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    getMovies();

    setPage(1);
    setSearchTerm("");
    setMovies([]);
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
    // getMovies();
  }

  function handlePrevPage() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
    // getMovies();
  }

  function toKebabCase(str) {
    return str.toLowerCase().replace(/ /g, "-");
  }

  function parseRatings(ratings) {
    return (
      ratings?.map((rating, i) => {
        const { Source: source, Value: value } = rating;
        const dict = {
          "Internet Movie Database": "IMDB",
          "Rotten Tomatoes": "RT",
        };
        return (
          <li key={i} className="rating-source">
            {dict[source] || source}: {value}
          </li>
        );
      }) ?? null
    );
  }

  const value = {
    searchTerm,
    movies,
    movie,
    page,
    getMovieInfo,
    handleInputChange,
    handleFormSubmit,
    handleNextPage,
    handlePrevPage,
    toKebabCase,
    parseRatings,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
