import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function SearchResults() {
  const { movies, page, setPage } = useContext(AppContext);

  return (
    movies && (
      <ol>
        {movies.map((movie, i) => (
          <li key={i}>
            <img src={movie.Poster} className="movie-poster" />
          </li>
        ))}
      </ol>
    )
  );
}
