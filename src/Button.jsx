import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Button() {
  const { getMovies } = useContext(AppContext);

  return (
    <button type="button" onClick={getMovies}>
      Test
    </button>
  );
}
