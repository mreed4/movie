import { useContext, useEffect, useMemo, useState, useTransition } from "react";

import { AppContext } from "../Contexts/AppContext";
import PartMovieListItem from "./Parts/MovieListItem";

export default function NowPlayingSection() {
  const { nowPlaying } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [nowPlayingGroup, setNowPlayingGroup] = useState(nowPlaying.slice(0, 4));

  useMemo(() => {
    return nowPlaying.sort((a, b) => {
      return a.release_date < b.release_date ? 1 : -1;
    });
  }, [nowPlaying]);

  useEffect(() => {
    setNowPlayingGroup(nowPlaying.slice(0, 4)); // Set the first four movies
  }, [nowPlaying]);

  function getNextFourMovies() {
    const nextFourMovies = nowPlaying.slice(page * 4, page * 4 + 4);
    // Get the next four movies

    startTransition(() => {
      if (page === 5) {
        // If the page is 5, reset the page to 1 and set the first four movies
        setPage(1);
        setNowPlayingGroup(nowPlaying.slice(0, 4));
      } else {
        // Otherwise, increment the page and set the next four movies
        setPage(page + 1);
        setNowPlayingGroup(nextFourMovies);
      }
    });
  }

  return (
    <section className="now-playing fade-in">
      <h2>Now Playing</h2>
      <button onClick={getNextFourMovies}>More</button> {page}
      <ul className="movies-now-playing movies-list">
        {nowPlayingGroup.map((movie) => {
          const { id } = movie;
          return (
            <li key={id} className="movie-now-playing movie">
              <PartMovieListItem movie={movie} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
