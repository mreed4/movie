import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const netlify = `/.netlify/functions`;

function AppProvider({ children }) {
  const [searchState, setSearchState] = useState({
    searchTerm: "",
    searchResults: [],
    requestToken: "", // Not used yet
    page: 1,
  });
  const { page } = searchState;

  const [movieInfo, setMovieInfo] = useState({});
  const [nowPlaying, setNowPlaying] = useState({});

  async function getNowPlaying() {
    const URL = `${netlify}/getNowPlaying`;

    const response = await fetch(URL);

    const data = await response.json();

    console.log(data);

    setNowPlaying(data);
  }

  /* * */

  async function authenticate() {
    // Not used yet
    const URL = `${netlify}/authenticate`;
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    setSearchState((prev) => ({
      ...prev,
      requestToken: data.request_token,
    }));
  }

  async function getSearchResults(page) {
    const { searchTerm, searchResults } = searchState;

    if (!searchTerm) return;

    const URL = `${netlify}/search?query=${searchTerm}&include_adult=false&page=${page}`;

    const response = await fetch(URL);
    const data = await response.json();
    const { results } = data;

    console.log(results);

    setSearchState((prev) => ({
      ...prev,
      searchResults: results,
    }));
  }

  async function getMovieInfo(id) {
    if (!id) return;

    const URL = `/.netlify/functions/getMovieInfo?id=${id}`;

    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    setMovieInfo(data);
  }

  /* * */

  function handleSearchInputChange(event) {
    const { value } = event.target;

    setSearchState((prev) => ({
      ...prev,
      searchTerm: value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    getSearchResults(page);

    setSearchState((prev) => ({
      ...prev,
      searchTerm: "",
    }));
  }

  /* * */

  function toKebabCase(str) {
    return str.toLowerCase().replace(/ /g, "-");
  }

  function alphaNumeric(str) {
    return str.replace(/[^a-z0-9]/gi, "-").replace(/-+/g, "-");
  }

  function titleCase(str) {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  function nextPage() {
    const { page } = searchState;

    setSearchState((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));

    console.log(page);

    getSearchResults(page);
  }

  function prevPage() {
    const { page } = searchState;

    if (page === 1) return;

    setSearchState((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));

    console.log(page);

    getSearchResults(page);
  }

  const value = {
    searchState,
    nowPlaying,
    movieInfo,
    setSearchState,
    /* * */
    authenticate,
    getSearchResults,
    getMovieInfo,
    /* * */
    handleSearchInputChange,
    handleFormSubmit,
    /* * */
    toKebabCase,
    alphaNumeric,
    titleCase,
    nextPage,
    prevPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
