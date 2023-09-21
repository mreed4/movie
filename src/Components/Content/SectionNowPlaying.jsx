import { useContext, useEffect, useMemo, useState, useTransition } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../Contexts/AppContext";

export default function NowPlayingSection() {
  const { nowPlaying, toKebabCase, alphaNumeric } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  const sortedNowPlaying = useMemo(() => {
    return nowPlaying.sort((a, b) => {
      return a.release_date < b.release_date ? 1 : -1;
    });
  }, [nowPlaying]);

  const [nowPlayingGroup, setNowPlaying] = useState(nowPlaying.slice(0, 4));

  useEffect(() => {
    setNowPlaying(nowPlaying.slice(0, 4)); // Set the first four movies
  }, [nowPlaying]);

  function getNextFourMovies() {
    const nextFourMovies = nowPlaying.slice(page * 4, page * 4 + 4);
    // Get the next four movies

    startTransition(() => {
      if (page === 5) {
        // If the page is 5, reset the page to 1 and set the first four movies
        setPage(1);
        setNowPlaying(nowPlaying.slice(0, 4));
      } else {
        // Otherwise, increment the page and set the next four movies
        setPage(page + 1);
        setNowPlaying(nextFourMovies);
      }
    });
  }

  return (
    <section className="now-playing fade-in">
      <h2>Now Playing</h2>
      <button onClick={getNextFourMovies}>More</button> {page}
      <ul className="movies-now-playing movies-list">
        {nowPlayingGroup.map((movie, i) => {
          const { id, title, poster_path, release_date } = movie;
          return (
            <li key={id} className="movie-now-playing movie">
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
