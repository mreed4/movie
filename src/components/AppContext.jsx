import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

const netlify = `/.netlify/functions`;

function AppProvider({ children }) {
  const [appState, setAppState] = useState({
    searchTerm: "",
    searchResults: [],
    movie: {},
    requestToken: "", // Not used yet
    page: 1,
  });

  const { page } = appState;

  async function authenticate() {
    // Not used yet
    const URL = `${netlify}/authenticate`;
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    setAppState((prev) => ({
      ...prev,
      requestToken: data.request_token,
    }));
  }

  async function getSearchResults(page) {
    const { searchTerm, searchResults } = appState;

    if (!searchTerm) return;

    const URL = `${netlify}/search?query=${searchTerm}&include_adult=false&page=${page}`;

    const response = await fetch(URL);
    const data = await response.json();
    const { results } = data;

    console.log(results);

    setAppState((prev) => ({
      ...prev,
      searchResults: results,
    }));
  }

  function getMovieInfo(id) {
    if (!id) return;

    const URL = `/.netlify/functions/getMovieInfo?movie_id=${id}`;

    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        setAppState((prev) => ({
          ...prev,
          movie: data,
        }));
      });
  }

  function handleSearchInputChange(event) {
    const { value } = event.target;

    setAppState((prev) => ({
      ...prev,
      searchTerm: value,
    }));
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    getSearchResults(page);

    setAppState((prev) => ({
      ...prev,
      searchTerm: "",
    }));
  }

  function toKebabCase(str) {
    return str.toLowerCase().replace(/ /g, "-");
  }

  function nextPage() {
    const { page } = appState;

    setAppState((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));

    console.log(page);

    getSearchResults(page);
  }

  function prevPage() {
    const { page } = appState;

    if (page === 1) return;

    setAppState((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));

    console.log(page);

    getSearchResults(page);
  }

  const value = {
    appState,
    setAppState,
    authenticate,
    getSearchResults,
    getMovieInfo,
    handleSearchInputChange,
    handleFormSubmit,
    toKebabCase,
    nextPage,
    prevPage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
