import "./App.css";
import LoginCard from "./pages/Login/LoginCard";
import { Nav } from "./pages/Nav/Nav";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import RegisterCard from "./pages/Register/RegisterCard";
import { Home } from "./pages/Home/Home";
import { Notebook } from "./pages/Notebook/Notebook";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/notebook" element={<Home />} />
          <Route path="/login" element={<LoginCard />} />
          <Route path="/register" element={<RegisterCard />} />
          <Route path="/note" element={<Notebook />} />

          <Route
            path="*"
            element={
              <div className="page-not-exist">
                <h2>This page does not exist</h2>
                <Link to="/notebook">
                  <button className="page-not-exits-btn">back to home</button>
                </Link>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
