import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../Contexts/AppContext";

import "../../assets/css/StartPage.css";

export default function StartPage() {
  const { nowPlaying, getNowPlaying } = useContext(AppContext);

  const movies = document.querySelector(".movies-now-playing");

  useEffect(() => {
    getNowPlaying();
  }, []);

  function nextFourMovies() {
    if (movies.scrollLeft >= movies.scrollWidth - movies.clientWidth) {
      movies.scrollLeft = 0;
      return;
    }
    movies.scrollLeft += 360 * 4;
  }

  return (
    <section id="start-page">
      <h2>Now Playing</h2>
      <button onClick={nextFourMovies}>Next</button>
      <ul className="movies-now-playing">
        {Object.keys(nowPlaying).length > 0 &&
          nowPlaying.results
            // .slice(0, 4)
            // .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .map((movie, i) => {
              const { id, title, poster_path, release_date, vote_average } = movie;
              return (
                <li key={`${id}-${i}`} className="movie-now-playing">
                  <Link to={`/movie/${title}-${release_date.slice(0, 4)}`} state={id}>
                    <img
                      src={poster_path ? `https://image.tmdb.org/t/p/w400${poster_path}` : "https://via.placeholder.com/200x300"}
                      alt={title}
                    />
                    <h3>{title}</h3>
                  </Link>
                </li>
              );
            })}
      </ul>
    </section>
  );
}
