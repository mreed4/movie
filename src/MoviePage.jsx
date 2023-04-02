import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
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
    <article className="movie-page">
      <div>
        <img src={poster} alt={title} className="movie-poster-big" />
      </div>
      <div>
        <h1>{title}</h1>
        <p>{year}</p>
        <p>{plot}</p>
      </div>
    </article>
  );
}
