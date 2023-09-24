import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavLink, Link, Navigate } from "react-router-dom";

import "../assets/css/App.css";

import MoviePage from "./Pages/MoviePage";
import StartPage from "./Pages/StartPage";
import PersonPage from "./Pages/PersonPage";

import NowPlayingSection from "./Content/SectionNowPlaying";
import SearchSection from "./Content/SectionSearch";
import UpcomingSection from "./Content/SectionUpcoming";

function Header() {
  return (
    <header>
      <Link to="/">
        <h1>Fink</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <NavLink to="/movies">Movies</NavLink>
          </li>
          <li>
            <NavLink to="/shows">Shows</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" />} />
          <Route path="/movies" element={<StartPage />}>
            <Route index element={<Navigate to="now-playing" />} />
            <Route path="now-playing" element={<NowPlayingSection />} />
            <Route path="search" element={<SearchSection />} />
            <Route path="upcoming" element={<UpcomingSection />} />
          </Route>
          <Route path="/person/:personDetails" element={<PersonPage />} />
          <Route path="/movie/:movieDetails" element={<MoviePage />} />
          <Route path="/shows" element={<h2>Shows</h2>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
