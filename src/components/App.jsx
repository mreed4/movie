import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";

function App() {
  const { authenticate, getSearchResults } = useContext(AppContext);

  useEffect(() => {
    // authenticate();
    getSearchResults();
  }, []);

  return (
    <Router>
      <main className="App">
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
