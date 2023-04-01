import { useContext } from "react";
import { AppContext } from "./AppContext";
import Button from "./Button";

export default function Inputs() {
  const { search, handleInputChange, handleFormSubmit } = useContext(AppContext);

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="search" id="search" value={search} onChange={handleInputChange} />
      <Button />
    </form>
  );
}
