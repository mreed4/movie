import { useParams, Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AppContext } from "./AppContext";

export default function MoviePage() {
  const { movie, getMovieInfo } = useContext(AppContext);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Plot: plot,
    Genre: genre,
    Director: director,
    Actors: actors,
    Rated: rated,
    Ratings: ratings,
  } = movie;

  const params = useParams();
  const { id } = params;

  useEffect(() => getMovieInfo(id), []);

  return (
    <>
      <article className="movie-page">
        <div>
          <img src={poster} alt={title} className="movie-poster-big" />
        </div>
        <div className="movie-info">
          <Link to="/">Back</Link>
          <h1>{title}</h1>
          <p>{year}</p>
          <p>{plot}</p>
        </div>
      </article>
    </>
  );
}
