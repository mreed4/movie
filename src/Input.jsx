import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Input() {
  const { search, handleInputChange } = useContext(AppContext);

  return <input type="text" name="search" id="search" value={search} onChange={handleInputChange} />;
}
