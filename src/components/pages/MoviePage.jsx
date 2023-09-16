import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/MoviePage.css";

export default function MoviePage() {
  const { getMovieInfo, getMovieImages, getMovieCredits, movieInfo, movieImages, movieCredits, titleCase } = useContext(AppContext);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    console.log("MoviePage mounted");
    getMovieInfo(id);
    getMovieImages(id);
    getMovieCredits(id);
  }, []);

  return (
    <section id="movie-page">
      {Object.keys(movieInfo).length > 0 && (
        <div className="movie-poster-and-info">
          <div className="movie-poster">
            {Object.keys(movieImages).length > 0 && (
              <img src={`https://image.tmdb.org/t/p/w400${movieInfo.poster_path}`} alt={movieInfo.title} />
            )}
            <div className="streaming-links">Netflix</div>
          </div>
          <div className="movie-info">
            <h2>{titleCase(movieInfo.title)}</h2>
            <div className="movie-info-details">
              <span>{movieInfo.release_date.slice(0, 4)}</span>
              <span>{movieInfo.genres.map((genre) => genre.name).join(", ")}</span>
              <span>
                {Math.floor(Number(movieInfo.runtime) / 60)}h {Number(movieInfo.runtime) % 60}m
              </span>
            </div>
            <h3>Overview</h3>
            <p>{movieInfo.overview}</p>
            <div className="movie-info-credits">
              {Object.keys(movieCredits).length > 0 && (
                <>
                  <div className="movie-info-credits-crew">
                    <ul>
                      {movieCredits.crew.slice(0, 4).map((crewMember, i) => {
                        const { id, name, job } = crewMember;
                        return (
                          <li key={`${id}-${i}`} className="movie-info-credits-crew-member">
                            <span>{name}</span>
                            <span>{job}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="movie-info-credits-cast">
                    <ul>
                      {movieCredits.cast.slice(0, 4).map((castMember) => {
                        const { id, name, character, profile_path } = castMember;
                        return (
                          <li key={id} className="movie-info-credits-cast-member">
                            <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt={name} title={`${name} as ${character}`} />
                            <span>{name}</span>
                            <span>{character}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
