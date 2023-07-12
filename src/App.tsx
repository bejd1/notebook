import "./App.css";
import LoginCard from "./pages/Login/LoginCard";
import { Nav } from "./pages/Nav/Nav";
import { Home } from "./pages/Home/Home";
// import { Footer } from "./pages/Footer/Footer";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import RegisterCard from "./pages/Register/RegisterCard";
import Note from "./pages/Note/Note";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import NoteTools from "./pages/Note/NoteTools";
import { useEffect, useState, createContext } from "react";
import { off, onValue, ref } from "firebase/database";
import { auth, database } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";

interface NoteI {
  id: string;
  title: string;
  note: string;
  date: number;
}

interface User {
  email: string;
}
export const AuthContext = createContext<{ authUser: User | null }>({
  authUser: null,
});

function App() {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState<NoteI[]>([]);
  const searchInput: string = "";

  // set data

  const DatabaseContext = createContext(data);
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
    });

    return () => {
      off(notesRef, "value", notesListener as any);
    };
  }, []);

  // auth

  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user as User);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <div className="App" style={{ position: "relative" }}>
      <DatabaseContext.Provider value={data}>
        <AuthContext.Provider value={{ authUser }}>
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
                    element={
                      <Note
                        setData={setData}
                        data={data}
                        searchInput={searchInput}
                      />
                    }
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
        </AuthContext.Provider>
      </DatabaseContext.Provider>
    </div>
  );
}

export default App;
