import { Link } from "react-router-dom";

import { useContext } from "react";
import { AppContext } from "../AppContext";

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
      <h1>Search Page</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="search" placeholder="Search for a movie..." onChange={handleSearchInputChange} value={searchTerm} />
        <button type="submit">Search</button>
      </form>
      <h2>Results</h2>
      <ul>
        {searchResults.map((movie) => {
          const { id, original_title, poster_path, release_date, vote_average } = movie;
          return (
            <li key={id}>
              <Link to={`/movie/${toKebabCase(alphaNumeric(original_title))}-${release_date.slice(0, 4)}`} state={id}>
                <h3>{original_title}</h3>
                <img
                  src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : "https://via.placeholder.com/200x300"}
                  alt={original_title}
                />
                <p>Released: {release_date}</p>
                <p>Rating: {vote_average}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
