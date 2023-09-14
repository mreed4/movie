import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

import "../../assets/css/MoviePage.css";

export default function MoviePage() {
  const { getMovieInfo, getMovieImages, movieInfo, movieImages, titleCase } = useContext(AppContext);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    console.log("MoviePage mounted");
    getMovieInfo(id);
    getMovieImages(id);
  }, []);

  return (
    <section id="movie-page">
      {Object.keys(movieInfo).length > 0 && (
        <div className="movie-poster-and-info">
          <div className="movie-poster">
            {Object.keys(movieImages).length > 0 && (
              <img src={`https://image.tmdb.org/t/p/w200${movieInfo.poster_path}`} alt={movieInfo.title} />
            )}
            <div className="streaming-links">Netflix</div>
          </div>
          <div className="movie-info">
            <h2>{titleCase(movieInfo.title)}</h2>
            <div className="movie-info-details">
              <span>{movieInfo.release_date.toLocaleString("en-US", { year: "numeric" })}</span>
              <span>{movieInfo.genres.map((genre) => genre.name).join(", ")}</span>
              <span>{movieInfo.runtime} minutes</span>
            </div>
            <p>{movieInfo.overview}</p>
          </div>
        </div>
      )}
    </section>
  );
}
