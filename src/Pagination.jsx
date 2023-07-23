import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Pagination() {
  const { searchResults, page, handleNextPage, handlePrevPage } = useContext(AppContext);

  return (
    searchResults.length !== 0 && (
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>
          Prev
        </button>{" "}
        Page {page} <button onClick={handleNextPage}>Next</button>
      </div>
    )
  );
}
