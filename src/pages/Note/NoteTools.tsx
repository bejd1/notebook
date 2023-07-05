import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { tokens } from "../../Theme";
import { InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Note from "./Note";
import NoteToolsSort from "./NoteToolsSort";
import AddNoteModal from "./AddNoteModal";

export default function NoteTools() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      <Typography textAlign="center" variant="h2" m="10px 0" fontWeight="bold">
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
            minWidth: "80%",
            minHeight: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: colors.color[100],
          }}
        >
          <Box
            sx={{
              border: `1px solid ${colors.secondary[100]}`,
              borderRadius: "8px",
              marginLeft: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <SearchIcon sx={{ m: 1 }} />
          </Box>
          <Box
            sx={{ marginRight: "20px", display: "flex", alignItems: "center" }}
          >
            {/* Sort items */}
            <NoteToolsSort />
            {/* Add new note modal  */}
            <AddNoteModal />
          </Box>
        </Card>
        <Note />
      </Box>
    </Box>
  );
}
