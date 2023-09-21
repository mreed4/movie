import { useLocation, Link } from "react-router-dom";
import { useContext, useMemo, useEffect } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/MoviePage.css";

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
    return <span>{movieInfo.release_date.slice(0, 4)}</span>;
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
    function RedPlayButton() {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.32258 1.87097L11 8L1.32258 14.129L1 1.87097H1.32258Z"
            fill="#E54B4B"
            stroke="#E54B4B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <a
        href={`https://www.youtube.com/watch?v=${movieVideos.results[0].key}`}
        target="_blank"
        rel="noreferrer"
        className="movie-info-trailer-link">
        <RedPlayButton />
        <span>Play Trailer</span>
      </a>
    );
  }

  return (
    <div className="movie-info-details">
      <MovieIMDB />
      <div className="movie-info-metadata">
        {hasReleaseDate && <MovieReleaseDate />}
        {hasGenres && <MovieGenres />}
        {hasRuntime && <MovieRuntime />}
      </div>
      {hasTrailer && <MovieTrailerLink />}
    </div>
  );
}

function MovieIMDB() {
  function IMDBLogo() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="32" viewBox="0 0 64 32" fill="none">
        <rect width="64" height="32" rx="10" fill="#F5C518" />
        <path
          d="M1 0.5C1 0.223858 0.776142 0 0.5 0C0.223858 0 0 0.223858 0 0.5C0 0.776142 0.223858 1 0.5 1C0.776142 1 1 0.776142 1 0.5Z"
          fill="#F5C518"
        />
        <path d="M8 25H13V7H8V25Z" fill="black" />
        <path
          d="M23.6725 7L22.5535 15.4085L21.8582 10.835C21.6566 9.37009 21.4632 8.09175 21.2781 7H15V25H19.2416L19.2581 13.1138L21.0436 25H24.0634L25.7584 12.8518L25.7707 25H30V7H23.6725Z"
          fill="black"
        />
        <path
          d="M32 25V7H39.8046C41.5694 7 43 8.41994 43 10.1766V21.8234C43 23.5778 41.5717 25 39.8046 25H32ZM37.8322 10.2395C37.6339 10.1323 37.2545 10.0807 36.7027 10.0807V21.8915C37.4313 21.8915 37.8797 21.7605 38.0478 21.4865C38.216 21.2166 38.3022 20.4861 38.3022 19.2872V12.3079C38.3022 11.494 38.272 10.974 38.216 10.7437C38.1599 10.5135 38.0349 10.3467 37.8322 10.2395Z"
          fill="black"
        />
        <path
          d="M52.4299 11.5069H52.7495C54.5447 11.5069 56 12.9127 56 14.6449V21.862C56 23.5951 54.5452 25 52.7495 25H52.4299C51.3315 25 50.3603 24.4737 49.7719 23.6683L49.4839 24.7688H45V7H49.7843V12.7805C50.4025 12.0102 51.3552 11.5069 52.4299 11.5069ZM51.4056 20.2842V16.0191C51.4056 15.3143 51.3603 14.8519 51.2661 14.639C51.1718 14.4261 50.7956 14.2894 50.5317 14.2894C50.2678 14.2894 49.8608 14.4005 49.7816 14.5877V16.0191V20.4208V21.8075C49.8721 22.013 50.2602 22.1274 50.5317 22.1274C50.8031 22.1274 51.1982 22.0167 51.2812 21.8075C51.3641 21.5983 51.4056 21.0881 51.4056 20.2842Z"
          fill="black"
        />
      </svg>
    );
  }

  const { movieIMDBRating, movieInfo, getMovieIMDBRating } = useContext(AppContext);

  useEffect(() => {
    getMovieIMDBRating(movieInfo.imdb_id);
  }, [movieInfo]);

  return (
    <div className="movie-info-imdb-rating">
      <IMDBLogo />
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
    <article id="movie-page" className="fade-in">
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
    </article>
  );
}
