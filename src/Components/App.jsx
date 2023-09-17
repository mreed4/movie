import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

import "../assets/css/App.css";

import SearchPage from "./Pages/SearchPage";
import MoviePage from "./Pages/MoviePage";
import StartPage from "./Pages/StartPage";

function App() {
  return (
    <Router>
      <header>
        <Link to="/">
          <h1>Fink</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <NavLink to="/">Movies</NavLink>
            </li>
            <li>
              <NavLink to="/shows">Shows</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<StartPage />} />
          {/* <Route path="/movies" element={<StartPage />} /> */}
          <Route path="/movie/:movieDetails" element={<MoviePage />} />
          <Route path="/shows" element={<h2>Shows</h2>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
