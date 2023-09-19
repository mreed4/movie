import { Link } from "react-router-dom";
import { useContext, useTransition, useMemo, useEffect, useState } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/StartPage.css";

function NowPlayingSection() {
  const { nowPlaying, toKebabCase, alphaNumeric } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [nowPlayingGroup, setNowPlaying] = useState(nowPlaying.slice(0, 4));

  useEffect(() => {
    setNowPlaying(nowPlaying.slice(0, 4)); // Set the first four movies
  }, [nowPlaying]);

  function nextFourMovies() {
    const nextFourMovies = nowPlaying.slice(page * 4, page * 4 + 4); // Get the next four movies

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
    <section className="now-playing">
      <h2>Now Playing</h2>
      <button onClick={nextFourMovies}>More</button> {page}
      <ul className="movies-now-playing">
        {nowPlayingGroup.map((movie, i) => {
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

export default function StartPage() {
  const { getNowPlaying } = useContext(AppContext);

  useMemo(() => {
    getNowPlaying();
  }, []);

  return (
    <article id="start-page">
      <NowPlayingSection />
    </article>
  );
}
