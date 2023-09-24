import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";
import PropTypes from "prop-types";

export default function PartMovieListItem({ movie }) {
  const { toKebabCase, alphaNumeric } = useContext(AppContext);
  const { id, title, poster_path, release_date } = movie;
  return (
    <Link to={`/movie/${toKebabCase(alphaNumeric(title))}-${release_date?.slice(0, 4)}`} state={id}>
      <img src={poster_path ? `https://image.tmdb.org/t/p/w400${poster_path}` : "https://via.placeholder.com/200x300"} alt={title} />
    </Link>
  );
}

PartMovieListItem.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
  }).isRequired,
};
