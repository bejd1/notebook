import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { tokens } from "../../Theme";
import { IconButton, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Note from "./Note";
import NoteToolsSort from "./NoteToolsSort";
import NestedModal from "./AddNoteModal";

export default function NoteTools() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      <Typography textAlign="center" variant="h1" m="10px 0">
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
          }}
        >
          <Box
            sx={{
              border: `1px solid ${colors.grey[100]}`,
              borderRadius: "8px",
              marginLeft: "20px",
            }}
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box
            sx={{ marginRight: "20px", display: "flex", alignItems: "center" }}
          >
            {/* Sort items */}
            <NoteToolsSort />
            {/* Add new note modal  */}
            <NestedModal />
          </Box>
        </Card>
        <Note />
      </Box>
    </Box>
  );
}
