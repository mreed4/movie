import { AppProvider } from "./AppContext";
import "./App.css";
import Inputs from "./Inputs";
import SearchResults from "./SearchResults";

function App() {
  return (
    <AppProvider>
      <main className="App">
        <Inputs />
        <SearchResults />
      </main>
    </AppProvider>
  );
}

export default App;
