import { createContext, useState, useEffect } from "react";

// const API_KEY = import.meta.env.VITE_API_KEY;
// const API = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const AppContext = createContext();

function AppProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [movie, setMovie] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => console.log(page), [page]);

  async function getSearchResults() {
    setSearchResults([]);
    if (!searchTerm) return;

    const URL = `/.netlify/functions/getSearchResults?s=${searchTerm}&type=movie&page=${page}`;
    const response = await fetch(URL);
    const data = await response.json();
    setSearchResults(data);
  }

  async function getMovieInfo(id) {
    setMovie({});
    if (!id) return;
    const URL = `/.netlify/functions/getMovieInfo?i=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
    setMovie(data);
  }

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    getSearchResults();

    setPage(1);
    setSearchTerm("");
    setSearchResults([]);
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
    // getSearchResults();
  }

  function handlePrevPage() {
    if (page === 1) return;
    setPage((prev) => prev - 1);
    // getSearchResults();
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
    searchResults,
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
