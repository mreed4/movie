import { AppProvider } from "./AppContext";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Inputs from "./Inputs";
import SearchResults from "./SearchResults";

function App() {
  return (
    <AppProvider>
      <Router>
        <main className="App">
          <Routes>
            <Route path="/" element={<Inputs />}></Route>
          </Routes>
          <SearchResults />
        </main>
      </Router>
    </AppProvider>
  );
}

export default App;
