import { useContext, useEffect, useMemo, useState, useTransition } from "react";

import { AppContext } from "../Contexts/AppContext";
import PartMovieListItem from "./Parts/MovieListItem";

export default function UpcomingSection() {
  const { upcoming } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [upcomingGroup, setUpcomingGroup] = useState(upcoming.slice(0, 5));

  useMemo(() => {
    return upcoming.sort((a, b) => {
      return a.release_date < b.release_date ? 1 : -1;
    });
  }, [upcoming]);

  useEffect(() => {
    setUpcomingGroup(upcoming.slice(0, 4)); // Set the first four movies
  }, [upcoming]);

  function getNextFourMovies() {
    const nextFourMovies = upcoming.slice(page * 4, page * 4 + 4);
    // Get the next four movies

    startTransition(() => {
      if (page === 5) {
        // If the page is 5, reset the page to 1 and set the first four movies
        setPage(1);
        setUpcomingGroup(upcoming.slice(0, 4));
      } else {
        // Otherwise, increment the page and set the next four movies
        setPage(page + 1);
        setUpcomingGroup(nextFourMovies);
      }
    });
  }

  return (
    <section className="upcoming fade-in">
      <h2>Upcoming</h2>
      <button onClick={getNextFourMovies}>More</button> {page}
      <ul className="movies-upcoming movies-list">
        {upcomingGroup.map((movie) => {
          const { id } = movie;
          return (
            <li key={id} className="movie-upcoming movie">
              <PartMovieListItem movie={movie} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
