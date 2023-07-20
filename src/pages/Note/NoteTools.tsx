import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { tokens } from "../../Theme";
import { InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Note from "./Note";
import NoteToolsSort from "./NoteToolsSort";
import AddNoteModal from "../Components/AddNoteModal";
import { useContext } from "react";
import { AuthContext, DataContext, SearchInputContext } from "../../App";
import Login from "../Login/Login";

interface User {
  email: string;
}

export default function NoteTools() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { setSearchInput } = useContext(SearchInputContext);
  const { data, setData } = useContext(DataContext);
  const { authUser }: { authUser: User | null } = useContext(AuthContext);

  return (
    <Box>
      {!authUser ? (
        <Login />
      ) : (
        <Box width="100%" mt="110px" overflow="hidden" minHeight="88vh">
          <Typography
            textAlign="center"
            variant="h2"
            m="10px 0"
            fontWeight="bold"
          >
            Your notes
          </Typography>
          <Box
            sx={{
              minWidth: "80%",
              minHeight: "70px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "column",
              marginTop: "40px",
            }}
          >
            <Card
              sx={{
                minWidth: { xs: "90%", sm: "80%" },
                m: "0 20px",
                minHeight: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: colors.secondBackground[100],
              }}
            >
              <Box
                sx={{
                  border: `1px solid ${colors.secondary[100]}`,
                  borderRadius: "8px",
                  ml: { xs: "10px", sm: "20px" },
                  mr: { xs: "10px", sm: "0" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <InputBase
                  onChange={(e) => setSearchInput(e.target.value)}
                  sx={{ ml: 2, flex: 1, fontSize: { xs: "14px", sm: "16px" } }}
                  placeholder="Search"
                />
                <SearchIcon sx={{ m: 1 }} />
              </Box>
              <Box
                sx={{
                  marginRight: { xs: "10px", sm: "20px" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {/* Sort items */}
                <NoteToolsSort setData={setData} data={data} />
                {/* Add new note modal  */}
                <AddNoteModal />
              </Box>
            </Card>
            <Note />
          </Box>
        </Box>
      )}
    </Box>
  );
}
