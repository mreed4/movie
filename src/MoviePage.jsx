import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function MoviePage() {
  const { movie, parseRatings } = useContext(AppContext);
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
    imdbID: id,
  } = movie;

  return (
    <article className="movie-page">
      <div>
        <img src={poster} alt={title} className="movie-poster-big" />
      </div>
      <div className="movie-info">
        <Link to="/">Back</Link>
        <h1>{title}</h1>
        <p>
          {year} &middot; {rated}
        </p>
        <ul className="movie-ratings">{parseRatings(ratings)}</ul>
        <p>{plot}</p>
        <ul className="movie-meta">
          <li>Director: {director}</li>
          <li>Actors: {actors}</li>
          <li>Genre: {genre}</li>
        </ul>
        <a href={`https://www.imdb.com/title/${id}`} target="_blank">
          More
        </a>
      </div>
    </article>
  );
}
