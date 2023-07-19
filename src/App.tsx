import React, {
  useEffect,
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { ColorModeContext, useMode } from "./Theme";
import { off, onValue, ref, query, orderByChild } from "firebase/database";
import { auth, database } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Nav } from "./pages/Nav/Nav";
import { Home } from "./pages/Home/Home";
import Note from "./pages/Note/Note";
import NoteTools from "./pages/Note/NoteTools";
import { Footer } from "./pages/Footer/Footer";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import { NoteI } from "./types/types";

interface DataI {
  data: NoteI[];
  setData: Dispatch<SetStateAction<NoteI[]>>;
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
    if (auth.currentUser?.uid) {
      const notesRef = ref(database, `users/${auth.currentUser?.uid}/items/`);
      const notesQuery = query(notesRef, orderByChild("date"));

      const notesListener = onValue(notesQuery, (snapshot) => {
        const notes: NoteI[] = [];
        snapshot.forEach((childSnapshot) => {
          const note = childSnapshot.val() as NoteI;
          note.id = childSnapshot.key as string;
          notes.push(note);
        });
        setData(notes);
      });

      return () => {
        off(notesQuery, "value", notesListener);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.currentUser?.uid]);

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
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        position: "relative",
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/note" element={<Note />} />
                    <Route path="/tools" element={<NoteTools />} />
                    <Route
                      path="*"
                      element={
                        <Box
                          sx={{
                            height: "100vh",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <Typography variant="h2">
                            This page does not exist
                          </Typography>
                          <Link to="/notebook">
                            <Button
                              sx={{
                                backgroundColor: "#4169e1",
                                p: "6px 12px",
                                mt: "10px",
                              }}
                            >
                              back to home
                            </Button>
                          </Link>
                        </Box>
                      }
                    />
                  </Routes>
                  <Footer />
                </BrowserRouter>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </AuthContext.Provider>
        </SearchInputContext.Provider>
      </DataContext.Provider>
    </Box>
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
