import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

export default function MoviePage() {
  const { getMovieInfo, movieInfo, titleCase } = useContext(AppContext);
  const location = useLocation();
  const id = location.state;

  useEffect(() => {
    console.log("MoviePage mounted");
    getMovieInfo(id);
  }, []);

  return <section id="movie-page">{Object.keys(movieInfo).length > 0 && <h1>{titleCase(movieInfo.original_title)}</h1>}</section>;
}
