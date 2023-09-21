import { useContext, useEffect, useMemo, useState, useTransition } from "react";
import { Link } from "react-router-dom";

import { AppContext } from "../Contexts/AppContext";

export default function UpcomingSection() {
  const { upcoming, toKebabCase, alphaNumeric } = useContext(AppContext);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);

  const sortedUpcoming = useMemo(() => {
    return upcoming.sort((a, b) => {
      return a.release_date < b.release_date ? 1 : -1;
    });
  }, [upcoming]);

  const [upcomingGroup, setUpcoming] = useState(sortedUpcoming.slice(0, 5));

  useEffect(() => {
    setUpcoming(sortedUpcoming.slice(0, 5)); // Set the first four movies
  }, [sortedUpcoming]);

  function getNextFiveMovies() {
    const nextFiveMovies = sortedUpcoming.slice(page * 5, page * 5 + 5);

    startTransition(() => {
      if (page === 4) {
        // If the page is 5, reset the page to 1 and set the first four movies
        setPage(1);
        setUpcoming(sortedUpcoming.slice(0, 5));
      } else {
        // Otherwise, increment the page and set the next four movies
        setPage(page + 1);
        setUpcoming(nextFiveMovies);
      }
    });
  }

  return (
    <section className="upcoming">
      <h2>Upcoming</h2>
      <button onClick={getNextFiveMovies}>More</button> {page}
      <ul className="movies-upcoming movies-list">
        {upcomingGroup.map((movie, i) => {
          const { id, title, poster_path, release_date } = movie;
          return (
            <li key={id} className="movie-upcoming movie">
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
