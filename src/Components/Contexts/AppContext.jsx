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

  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  /* * */

  const [movieInfo, setMovieInfo] = useState({});
  const [movieImages, setMovieImages] = useState({});
  const [movieCredits, setMovieCredits] = useState({});
  const [movieIMDBRating, setMovieIMDBRating] = useState({});
  const [movieVideos, setMovieVideos] = useState({});
  const [movieProviders, setMovieProviders] = useState({});
  const [movieSimilar, setMovieSimilar] = useState({});

  /* * */

  async function getNowPlaying() {
    const URL = `${netlify}/getNowPlaying`;

    const response = await fetch(URL);

    const data = await response.json();

    // console.log(data);

    setNowPlaying(data.results);
  }

  async function getUpcoming() {
    const URL = `${netlify}/getUpcoming`;

    const response = await fetch(URL);

    const data = await response.json();

    // console.log(data);

    setUpcoming(data.results);
  }

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

    const URL = `${netlify}/search?query=${searchTerm}`;

    const response = await fetch(URL);
    const data = await response.json();
    const { results } = data;

    // console.log(results);

    setSearchState((prev) => ({
      ...prev,
      searchResults: results,
    }));
  }

  async function getMovieInfo(id) {
    if (!id) return;

    const URL = `${netlify}/getMovieInfo?id=${id}`;

    const response = await fetch(URL);
    const data = await response.json();

    // console.log(data);

    setMovieInfo(data);
  }

  async function getMovieImages(id) {
    if (!id) return;

    const URL = `${netlify}/getMovieImages?id=${id}`;

    const response = await fetch(URL);
    const data = await response.json();

    // console.log(data);

    setMovieImages(data);
  }

  async function getMovieCredits(id) {
    if (!id) return;

    const URL = `${netlify}/getMovieCredits?id=${id}`;

    const response = await fetch(URL);

    const data = await response.json();

    // console.log(data);

    setMovieCredits(data);
  }

  async function getMovieIMDBRating(imdb_id) {
    if (!imdb_id) return;

    const URL = `${netlify}/getMovieIMDBRating?imdb_id=${imdb_id}`;

    const response = await fetch(URL);

    const data = await response.json();

    // console.log(data.imdbRating, data);

    setMovieIMDBRating((prev) => ({
      ...prev,
      imdbRating: data.imdbRating,
    }));
  }

  async function getMovieVideos(id) {
    if (!id) return;

    const URL = `${netlify}/getMovieVideos?id=${id}`;

    const response = await fetch(URL);

    const data = await response.json();

    console.log(data);

    setMovieVideos(data);
  }

  async function getMovieProviders(id) {
    if (!id) return;

    const URL = `${netlify}/getMovieProviders?id=${id}`;

    const response = await fetch(URL);

    const data = await response.json();

    console.log(data);

    setMovieProviders(data);
  }

  async function getMovieSimilar(id) {
    if (!id) return;

    const URL = `${netlify}/getMovieSimilar?id=${id}`;

    const response = await fetch(URL);

    const data = await response.json();

    console.log(data);

    setMovieSimilar(data);
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
    upcoming,
    movieInfo,
    movieImages,
    movieCredits,
    movieIMDBRating,
    movieVideos,
    movieProviders,
    movieSimilar,
    /* * */
    setSearchState,
    setNowPlaying,
    setUpcoming,
    /* * */
    getNowPlaying,
    getUpcoming,
    /* * */
    authenticate,
    getSearchResults,
    getMovieInfo,
    getMovieImages,
    getMovieCredits,
    getMovieIMDBRating,
    getMovieVideos,
    getMovieProviders,
    getMovieSimilar,
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
