import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Pagination() {
  const { movies, page, handleNextPage, handlePrevPage } = useContext(AppContext);

  return (
    movies.length !== 0 && (
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>
        Page {page} <button onClick={handleNextPage}>Next</button>
      </div>
    )
  );
}
