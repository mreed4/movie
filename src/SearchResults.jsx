import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

export default function SearchResults() {
  const { movies, toKebabCase } = useContext(AppContext);

  return (
    movies.length !== 0 && (
      <div id="search-results">
        <ol>
          {movies.map(({ Poster: src, Title: title, Year: year, imdbID: id }, i) => (
            <li key={i}>
              <Link to={`/movie/${id}/${toKebabCase(title)}-${year}`}>
                <img src={src !== "N/A" ? src : "https://placehold.co/150x250?text=No+Poster"} className="movie-poster" />
              </Link>
            </li>
          ))}
        </ol>
        <Pagination />
      </div>
    )
  );
}
