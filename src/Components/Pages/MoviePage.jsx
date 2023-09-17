import { useLocation } from "react-router-dom";
import { useContext, useMemo, useEffect } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/MoviePage.css";

import IMDB from "../Content/IMDB";
import RedPlayButton from "../Content/RedPlayButton";

export default function MoviePage() {
  const {
    getMovieInfo,
    getMovieImages,
    getMovieCredits,
    getMovieIMDBRating,
    getMovieVideos,
    movieInfo,
    movieImages,
    movieCredits,
    movieIMDBRating,
    movieVideos,
    titleCase,
  } = useContext(AppContext);
  const location = useLocation();
  const id = location.state;

  useMemo(() => {
    getMovieInfo(id);
    getMovieImages(id);
    getMovieCredits(id);
    getMovieVideos(id);
  }, [id]);

  useEffect(() => {
    getMovieIMDBRating(movieInfo.imdb_id);
  }, [movieInfo]);

  function rolesByCrewMember() {
    const rolesByCrewMember = {}; // Initialize an empty object to store crew members and their roles
    Object.keys(movieCredits).length > 0 && // If movieCredits is not empty
      movieCredits.crew
        .filter((crewMember) => ["Director", "Writer"].includes(crewMember.job))
        .forEach((crewMember) => {
          // For each crew member
          const { id, name, job } = crewMember; // Destructure the crew member's id, name, and job
          if (rolesByCrewMember[name]) {
            // If the crew member's name is already a key in rolesByCrewMember
            rolesByCrewMember[name].push(job); // Add the crew member's job to the array of jobs for that crew member
          } else {
            // If the crew member's name is not already a key in rolesByCrewMember
            rolesByCrewMember[name] = [job]; // Add the crew member's name as a key in rolesByCrewMember and set its value to an array containing the crew member's job
          }
        });
    // console.log(rolesByCrewMember); // Log the rolesByCrewMember object to the console
    return rolesByCrewMember; // Return the rolesByCrewMember object
  }

  const hasTrailer = movieVideos.results?.length > 0;
  const hasGenres = movieInfo.genres?.length > 0;
  const hasCast = movieCredits.cast?.length > 0;

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
              {hasGenres && <span>{movieInfo.genres.map((genre) => genre.name).join(", ")}</span>}
              <span>
                {Math.floor(Number(movieInfo.runtime) / 60)}h {Number(movieInfo.runtime) % 60}m
              </span>
              {hasTrailer && (
                <a href={`https://www.youtube.com/watch?v=${movieVideos.results[0].key}`} target="_blank" rel="noreferrer">
                  <RedPlayButton />
                  <span>Play Trailer</span>
                </a>
              )}
            </div>
            <div className="movie-info-imdb-rating">
              <IMDB />
              <div>
                <span>{movieIMDBRating.imdbRating}</span>
                <span>/ 10</span>
              </div>
            </div>
            <h3>Overview</h3>
            <p>{movieInfo.overview}</p>
            <div className="movie-info-credits">
              {Object.keys(movieCredits).length > 0 && (
                <>
                  <div className="movie-info-credits-crew">
                    <ul>
                      {rolesByCrewMember() &&
                        Object.keys(rolesByCrewMember()).map((crewMember) => {
                          return (
                            <li key={crewMember} className="movie-info-credits-crew-member">
                              <span>{crewMember}</span>
                              <span>{rolesByCrewMember()[crewMember].join(", ")}</span>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="movie-info-credits-cast">
                    {hasCast && (
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
                    )}
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
