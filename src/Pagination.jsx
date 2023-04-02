import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Pagination() {
  const { movies, page, handleNextPage } = useContext(AppContext);

  return (
    movies && (
      <div>
        {page} <button onClick={handleNextPage}>Next</button>
      </div>
    )
  );
}
