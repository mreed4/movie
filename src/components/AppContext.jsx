import { createContext, useState, useEffect } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [appState, setAppState] = useState({
    searchTerm: "red",
    searchResults: [],
    movie: {},
    requestToken: "", // Not used yet
  });

  async function authenticate() {
    // Not used yet
    const URL = "/.netlify/functions/authenticate";
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);

    setAppState((prev) => ({
      ...prev,
      requestToken: data.request_token,
    }));
  }

  async function getSearchResults() {
    const { searchTerm } = appState;

    setAppState((prev) => ({
      ...prev,
      searchResults: [],
    }));

    if (!searchTerm) return;

    const URL = `/.netlify/functions/getSearchResults?query=${searchTerm}&include_adult=false`;
    const response = await fetch(URL);
    const data = await response.json();

    console.log(data);
  }

  async function getMovieInfo(id) {
    setAppState((prev) => ({
      ...prev,
      movie: {},
    }));

    if (!id) return;

    const URL = `/.netlify/functions/getMovieInfo?movie_id=${id}`;
    const response = await fetch(URL);
    const data = await response.json();
  }

  function handleInputChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    getSearchResults();

    setPage(1);
    setSearchTerm("");
  }

  function toKebabCase(str) {
    return str.toLowerCase().replace(/ /g, "-");
  }

  const value = {
    appState,
    setAppState,
    authenticate,
    getSearchResults,
    getMovieInfo,
    handleInputChange,
    handleFormSubmit,
    toKebabCase,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
