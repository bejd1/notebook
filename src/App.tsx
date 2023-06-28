import "./App.css";
import LoginCard from "./pages/Login/LoginCard";
import { Nav } from "./pages/Nav/Nav";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import RegisterCard from "./pages/Register/RegisterCard";
import { Home } from "./pages/Home/Home";
import Note from "./pages/Note/Note";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import NoteTools from "./pages/Note/NoteTools";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <div className="App" style={{ position: "relative" }}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <Nav />
            <Routes>
              <Route path="/notebook" element={<Home />} />
              <Route path="/login" element={<LoginCard />} />
              <Route path="/register" element={<RegisterCard />} />
              <Route path="/note" element={<Note />} />
              <Route path="/tools" element={<NoteTools />} />

              <Route
                path="*"
                element={
                  <div className="page-not-exist">
                    <h2>This page does not exist</h2>
                    <Link to="/notebook">
                      <button className="page-not-exits-btn">
                        back to home
                      </button>
                    </Link>
                  </div>
                }
              />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
