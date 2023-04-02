import { useContext } from "react";
import { AppContext } from "./AppContext";
import Button from "./Button";
import Input from "./Input";

export default function Inputs() {
  const { handleFormSubmit } = useContext(AppContext);

  return (
    <form onSubmit={handleFormSubmit}>
      <Input />
      <Button />
    </form>
  );
}
