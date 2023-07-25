import { AppProvider } from "./AppContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <AppProvider>
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
    </AppProvider>
  );
}

export default App;
