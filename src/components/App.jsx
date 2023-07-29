import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import "../assets/css/App.css";

import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/movie/:title-year" element={<SearchPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
