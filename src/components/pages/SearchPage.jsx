import { useContext } from "react";
import { AppContext } from "../AppContext";

import "../../assets/css/SearchPage.css";

export default function SearchPage() {
  const {
    appState: { searchTerm, page, searchResults },
    handleSearchInputChange,
    handleFormSubmit,
    nextPage,
    prevPage,
  } = useContext(AppContext);

  return (
    <section id="search-page">
      <h1>Search Page</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="search" placeholder="Search for a movie..." onChange={handleSearchInputChange} value={searchTerm} />
        <button type="submit">Search</button>
      </form>
      {/* <button type="button" onClick={prevPage} disabled={page === 1}>
        Prev
      </button>
      <button type="button" onClick={nextPage}>
        Next
      </button> */}
      <h2>Results</h2>
      <ul>
        {searchResults.map((movie) => {
          const { id, original_title, poster_path, release_date, vote_average } = movie;
          return (
            <li key={id}>
              {/* <h3>{original_title}</h3> */}
              <img
                src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : "https://via.placeholder.com/200x300"}
                alt={original_title}
              />
              {/* <p>Released: {release_date}</p>
              <p>Rating: {vote_average}</p> */}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
