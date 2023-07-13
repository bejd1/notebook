import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import { off, onValue, ref } from "firebase/database";
import { auth, database } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoginCard from "./pages/Login/LoginCard";
import { Nav } from "./pages/Nav/Nav";
import { Home } from "./pages/Home/Home";
import RegisterCard from "./pages/Register/RegisterCard";
import Note from "./pages/Note/Note";
import NoteTools from "./pages/Note/NoteTools";

interface DataI {
  data: NoteI[];
  setData: Dispatch<SetStateAction<NoteI[]>>;
}

interface NoteI {
  id: string;
  title: string;
  note: string;
  date: number;
}

interface User {
  email: string;
}

interface SearchingInputI {
  searchInput: string;
  setSearchInput: Dispatch<React.SetStateAction<string>>;
}

function App() {
  const [theme, colorMode] = useMode();
  const [data, setData] = useState<NoteI[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  // data

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
        setAuthUser({ email: user.email || "" });
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <DataContext.Provider value={{ data, setData }}>
        <SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
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
                  {/* <Footer /> */}
                </BrowserRouter>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </AuthContext.Provider>
        </SearchInputContext.Provider>
      </DataContext.Provider>
    </div>
  );
}
export const DataContext = createContext<DataI>({
  data: [],
  setData: () => {},
});

export const SearchInputContext = createContext<SearchingInputI>({
  searchInput: "",
  setSearchInput: () => {},
});
export const AuthContext = createContext<{ authUser: User | null }>({
  authUser: null,
});
export default App;
