import { AppProvider } from "./AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Search from "./Search";
import MoviePage from "./MoviePage";

function App() {
  return (
    <AppProvider>
      <Router>
        <main className="App">
          <Routes>
            <Route path="/" element={<Search />}></Route>
            <Route path="/movie/:id/:slug" element={<MoviePage />}></Route>
            <Route path="*" element={<h1>Test</h1>}></Route>
          </Routes>
        </main>
      </Router>
    </AppProvider>
  );
}

export default App;
