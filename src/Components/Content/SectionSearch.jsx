import { useContext, useRef, useMemo } from "react";

import { AppContext } from "../Contexts/AppContext";
import PartMovieListItem from "./Parts/MovieListItem";

export default function SearchSection() {
  const {
    searchState: { searchResults, searchTerm },
    setSearchState,
    getSearchResults,
  } = useContext(AppContext);

  const searchInputRef = useRef(null);

  useMemo(() => {
    getSearchResults();
  }, [searchTerm]);

  function handleFormSubmit(e) {
    e.preventDefault();

    const { value } = searchInputRef.current;

    setSearchState((prev) => ({
      ...prev,
      searchTerm: value,
    }));

    searchInputRef.current.value = "";

    searchInputRef.current.focus();
  }

  return (
    <section className="search-page fade-in">
      <h2>Search</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="search" placeholder="Search for a movie..." ref={searchInputRef} />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <>
          <h2>Results</h2>
          <ul className="movies-search-results movies-list">
            {searchResults.map((movie) => {
              const { id } = movie;
              return (
                <li className="movie-search-result movie" key={id}>
                  <PartMovieListItem movie={movie} />
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
