import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

export default function SearchResults() {
  const { movies } = useContext(AppContext);

  return (
    movies && (
      <>
        <ol>
          {movies.map((movie, i) => (
            <li key={i}>
              <Link to="/movie/:id">
                <img src={movie.Poster !== "N/A" ? movie.Poster : "https://placehold.co/150x250?text=No+Poster"} className="movie-poster" />
              </Link>
            </li>
          ))}
        </ol>
        {/* <Pagination /> */}
      </>
    )
  );
}
