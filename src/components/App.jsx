import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "../assets/css/App.css";

import SearchPage from "./Pages/SearchPage";
import MoviePage from "./Pages/MoviePage";

function App() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:movieDetails" element={<MoviePage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
