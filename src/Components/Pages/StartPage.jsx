import { Link } from "react-router-dom";
import { useContext, useTransition, useMemo } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/StartPage.css";

export default function StartPage() {
  const { nowPlaying, setNowPlaying, getNowPlaying, toKebabCase, alphaNumeric } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();

  useMemo(() => {
    getNowPlaying();
  }, []);

  function nextFourMovies() {
    const fourMovies = nowPlaying.slice(0, 4);

    startTransition(() => {
      setNowPlaying((prev) => [...prev.slice(4), ...fourMovies]);
    });
  }

  return (
    <section id="start-page">
      <h2>Now Playing</h2>
      <button onClick={nextFourMovies}>Next</button>
      <ul className="movies-now-playing">
        {nowPlaying.map((movie) => {
          const { id, title, poster_path, release_date } = movie;
          return (
            <li key={id} className="movie-now-playing">
              <Link to={`/movie/${toKebabCase(alphaNumeric(title))}-${release_date.slice(0, 4)}`} state={id}>
                <img
                  src={poster_path ? `https://image.tmdb.org/t/p/w400${poster_path}` : "https://via.placeholder.com/200x300"}
                  alt={title}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
