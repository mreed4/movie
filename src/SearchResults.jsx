import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

export default function SearchResults() {
  const { searchResults, toKebabCase, getMovieInfo } = useContext(AppContext);

  return searchResults && searchResults.length !== 0 ? (
    <div id="search-results">
      <ol>
        {searchResults.map((movie, i) => {
          const { imdbID: id, Title: title, Year: year, Poster: src } = movie;
          return (
            <li key={i}>
              <Link to={`/movie/${id}/${toKebabCase(title)}-${year}`} onClick={() => getMovieInfo(id)}>
                <img src={src !== "N/A" ? src : "https://placehold.co/150x250?text=No+Poster"} className="movie-poster" alt={title} />
              </Link>
            </li>
          );
        })}
      </ol>
      {/* <Pagination /> */}
    </div>
  ) : (
    !searchResults && "No results found"
  );
}
