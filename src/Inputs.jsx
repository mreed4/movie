import { useContext } from "react";
import { AppContext } from "./AppContext";
import Button from "./Button";

export default function Inputs() {
  const { searchTerm, handleInputChange, handleFormSubmit } = useContext(AppContext);

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="search" id="search" value={searchTerm} onChange={handleInputChange} />
      <Button />
    </form>
  );
}
