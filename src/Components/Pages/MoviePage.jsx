import { useLocation, Link } from "react-router-dom";
import { useContext, useMemo, useEffect } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/MoviePage.css";

import IMDB from "../Content/IMDB";
import RedPlayButton from "../Content/RedPlayButton";

function MoviePosterWatch() {
  const { movieInfo } = useContext(AppContext);

  return (
    <aside className="movie-poster-and-rating">
      <div className="movie-poster">
        <img src={`https://image.tmdb.org/t/p/w400${movieInfo.poster_path}`} alt={movieInfo.title} className="blur" />
        <img src={`https://image.tmdb.org/t/p/w400${movieInfo.poster_path}`} alt={movieInfo.title} className="poster" />
      </div>
      <div className="movie-watch">
        <MovieWatch />
      </div>
    </aside>
  );
}

function MovieTitle() {
  const { movieInfo } = useContext(AppContext);

  return <h2 className="movie-info-title">{movieInfo.title}</h2>;
}

function MovieDetails() {
  const { movieInfo, movieVideos } = useContext(AppContext);

  const hasTrailer = movieVideos.results?.length > 0;
  const hasGenres = movieInfo.genres?.length > 0;
  const hasReleaseDate = movieInfo.release_date?.length > 0;
  const hasRuntime = movieInfo.runtime !== 0;

  function MovieReleaseDate() {
    return <span>{movieInfo.release_date?.slice(0, 4)}</span>;
  }

  function MovieGenres() {
    const num = movieInfo.genres.length;

    if (num > 2) {
      return (
        <span>
          {movieInfo.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(", ")}
          {`, +${num - 2} more`}
        </span>
      );
    } else {
      return (
        <span>
          {movieInfo.genres
            .slice(0, 2)
            .map((genre) => genre.name)
            .join(", ")}
        </span>
      );
    }
  }

  function MovieRuntime() {
    return (
      <span>
        {Math.floor(Number(movieInfo.runtime) / 60)}h {Number(movieInfo.runtime) % 60}m
      </span>
    );
  }

  function MovieTrailerLink() {
    return (
      <a href={`https://www.youtube.com/watch?v=${movieVideos.results[0].key}`} target="_blank" rel="noreferrer">
        <RedPlayButton />
        <span>Play Trailer</span>
      </a>
    );
  }

  return (
    <div className="movie-info-details">
      <MovieIMDB />
      {hasReleaseDate && <MovieReleaseDate />}
      {hasGenres && <MovieGenres />}
      {hasRuntime && <MovieRuntime />}
      {hasTrailer && <MovieTrailerLink />}
    </div>
  );
}

function MovieIMDB() {
  const { movieIMDBRating, movieInfo, getMovieIMDBRating } = useContext(AppContext);

  useEffect(() => {
    getMovieIMDBRating(movieInfo.imdb_id);
  }, [movieInfo]);

  return (
    <div className="movie-info-imdb-rating">
      <IMDB />
      <div>
        <span>{movieIMDBRating.imdbRating}</span>
        <span>/ 10</span>
      </div>
    </div>
  );
}

function MovieOverview() {
  const { movieInfo } = useContext(AppContext);

  const hasOverview = movieInfo.overview?.length > 0;

  if (!hasOverview) return null;

  return (
    <div className="movie-info-overview">
      <h3>Overview</h3>
      <p>{movieInfo.overview}</p>
    </div>
  );
}

function MovieCredits() {
  const { movieCredits } = useContext(AppContext);

  function MovieCrew() {
    function rolesByCrewMember() {
      const rolesByCrewMember = {}; // Initialize an empty object to store crew members and their roles
      Object.keys(movieCredits).length > 0 && // If movieCredits is not empty
        movieCredits.crew
          .filter((crewMember) => ["Director", "Writer"].includes(crewMember.job)) // Filter the crew members to only include directors and writers
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

    return (
      <div className="movie-info-credits-crew">
        <ul>
          {rolesByCrewMember() &&
            Object.keys(rolesByCrewMember())
              .slice(0, 4)
              .map((crewMember) => {
                return (
                  <li key={crewMember} className="movie-info-credits-crew-member">
                    <span className="truncate">{crewMember}</span>
                    <span className="truncate">{rolesByCrewMember()[crewMember].join(", ")}</span>
                  </li>
                );
              })}
        </ul>
      </div>
    );
  }

  function MovieCast() {
    const hasCast = movieCredits.cast?.length > 0;

    if (!hasCast) return null;

    return (
      <div className="movie-info-credits-cast">
        <ul>
          {movieCredits.cast.slice(0, 4).map((castMember) => {
            const { id, name, character, profile_path } = castMember;
            return (
              <li key={id} className="movie-info-credits-cast-member">
                <img src={`https://image.tmdb.org/t/p/w200${profile_path}`} alt={name} title={`${name} as ${character}`} />
                <span className="truncate" title={name}>
                  {name}
                </span>
                <span className="truncate" title={character}>
                  {character}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="movie-info-credits">
      {/* <h3>Credits</h3> */}
      <MovieCrew />
      <MovieCast />
    </div>
  );
}

function MovieWatch() {
  const { movieProviders } = useContext(AppContext);

  function MovieProviders() {
    const hasProviders = movieProviders.results?.US?.flatrate?.length > 0;

    if (!hasProviders) return null;

    return (
      <div className="movie-info-watch-providers">
        <ul>
          {movieProviders.results.US.flatrate.map((provider) => {
            const { provider_id, provider_name, logo_path } = provider;
            return (
              <li key={provider_id} className="movie-info-watch-provider">
                <img src={`https://image.tmdb.org/t/p/w200${logo_path}`} alt={provider_name} />
              </li>
            );
          })}
        </ul>

        <span className="just-watch">Powered by JustWatch</span>
      </div>
    );
  }

  return (
    <div className="movie-info-watch">
      {/* <h3>Watch</h3> */}
      <MovieProviders />
    </div>
  );
}

function MovieSimilar() {
  const { movieSimilar, toKebabCase, alphaNumeric } = useContext(AppContext);

  const hasSimilar = movieSimilar.results?.length > 0;

  if (!hasSimilar) return null;

  return (
    <div className="movie-info-similar">
      <h3>Similar</h3>
      <ul>
        {movieSimilar.results.slice(0, 6).map((movie) => {
          const { id, title, poster_path, release_date } = movie;
          return (
            <li key={id} className="movie-info-similar-movie">
              <Link to={`/movie/${toKebabCase(alphaNumeric(title))}-${release_date.slice(0, 4)}`} state={id}>
                <img
                  src={poster_path ? `https://image.tmdb.org/t/p/w200${poster_path}` : "https://via.placeholder.com/200x300"}
                  alt={title}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function MoviePage() {
  const { getMovieInfo, getMovieImages, getMovieCredits, getMovieVideos, getMovieProviders, getMovieSimilar } = useContext(AppContext);
  const location = useLocation();
  const id = location.state;

  useMemo(() => {
    getMovieInfo(id);
    getMovieImages(id);
    getMovieCredits(id);
    getMovieVideos(id);
    getMovieProviders(id);
    getMovieSimilar(id);
  }, [id]);

  return (
    <section id="movie-page">
      <div className="movie-poster-and-info">
        <MoviePosterWatch />
        <div className="movie-info">
          <MovieTitle />
          <MovieDetails />
          <MovieOverview />
          <MovieCredits />
          <MovieSimilar />
        </div>
      </div>
    </section>
  );
}
