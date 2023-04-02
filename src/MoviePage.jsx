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
    imdbRating: rating,
  } = movie;

  const params = useParams();
  const { id } = params;

  useEffect(() => getMovieInfo(id), []);

  return (
    <>
      <h1>{title}</h1>
      <h2>{year}</h2>
      <img src={poster} alt={title} className="movie-poster-big" />
      <p>{plot}</p>
    </>
  );
}
