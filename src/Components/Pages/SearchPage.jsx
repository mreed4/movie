import { Link } from "react-router-dom";

import { useContext } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/SearchPage.css";

export default function SearchPage() {
  const {
    searchState: { searchTerm, page, searchResults },
    handleSearchInputChange,
    handleFormSubmit,
    nextPage,
    prevPage,
    toKebabCase,
    alphaNumeric,
  } = useContext(AppContext);

  return (
    <section id="search-page">
      <h2>Search Page</h2>
      <form onSubmit={handleFormSubmit}>
        <input type="search" placeholder="Search for a movie..." onChange={handleSearchInputChange} value={searchTerm} />
        <button type="submit">Search</button>
      </form>
      <h2>Results</h2>
      <ul>
        {searchResults.map((movie, i) => {
          const { id, title, poster_path, release_date } = movie;
          return (
            <li key={`${id}-${i}`}>
              <Link to={`/movie/${toKebabCase(alphaNumeric(title))}-${release_date.slice(0, 4)}`} state={id}>
                <img
                  src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : "https://via.placeholder.com/200x300"}
                  alt={title}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
