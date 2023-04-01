import { AppProvider } from "./AppContext";
import "./App.css";
import Button from "./Button";
import Input from "./Input";

function App() {
  return (
    <AppProvider>
      <main className="App">
        <Input />
        <Button />
      </main>
    </AppProvider>
  );
}

export default App;
