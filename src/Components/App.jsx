import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

import "../assets/css/App.css";

import SearchPage from "./Pages/SearchPage";
import MoviePage from "./Pages/MoviePage";

function App() {
  return (
    <Router>
      <header>
        <h1>Fink</h1>
        <nav>
          <ul>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/shows">Shows</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movies" element={<h2>Movies</h2>} />
          <Route path="/movie/:movieDetails" element={<MoviePage />} />
          <Route path="/shows" element={<h2>Shows</h2>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
