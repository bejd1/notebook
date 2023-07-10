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
// import { Footer } from "./pages/Footer/Footer";
import { useEffect, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { database } from "./Firebase";

interface NoteI {
  id: string;
  title: string;
  note: string;
  date: number;
}

function App() {
  const [theme, colorMode] = useMode();

  const [data, setData] = useState<NoteI[]>([]);

  // set data

  useEffect(() => {
    const notesRef = ref(database, "notes");

    const notesListener = onValue(notesRef, (snapshot) => {
      const notes: NoteI[] = [];
      snapshot.forEach((childSnapshot) => {
        const note = childSnapshot.val() as NoteI;
        note.id = childSnapshot.key as string;
        notes.push(note);
      });
      setData(notes);
      console.log(notes);
    });

    return () => {
      off(notesRef, "value", notesListener as any);
    };
  }, []);

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
              <Route
                path="/note"
                element={<Note setData={setData} data={data} />}
              />
              <Route
                path="/tools"
                element={<NoteTools setData={setData} data={data} />}
              />

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
            {/* <Footer /> */}
          </BrowserRouter>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}

export default App;
