import { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import DeleteModal from "../Components/DeleteModal";
import InfoSnackbar from "../Components/SnackBar";
import EditNoteModal from "../Components/EditNoteModal";
import { auth, database } from "../../Firebase";
import { ref, remove } from "firebase/database";
import copy from "copy-to-clipboard";
import { AuthContext, DataContext, SearchInputContext } from "../../App";
import NoteTools from "./NoteTools";
import { NoteI, User } from "../../types/types";
import ToolsMenu from "../Components/ToolsMenu";

const Note = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { searchInput } = useContext(SearchInputContext);
  const { data, setData } = useContext(DataContext);
  const { authUser }: { authUser: User | null } = useContext(AuthContext);

  const deleteNote = (id: string) => {
    const noteRef = ref(database, `users/${auth.currentUser?.uid}/items/${id}`);

    remove(noteRef)
      .then(() => {
        setData((prevData) => prevData.filter((note) => note.id !== id));
      })
      .catch((error) => {
        console.log("Error deleting note:", error);
      });
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        mb: "100px",
      }}
    >
      {!authUser ? <NoteTools /> : ""}
      {data.length === 0 ? (
        <Typography variant="h3" sx={{ mt: "50px" }}>
          Your notes are empty.
        </Typography>
      ) : (
        data
          .filter((item) => {
            if (searchInput === "") {
              return true;
            } else {
              return item.title
                .toLowerCase()
                .includes(searchInput.toLowerCase());
            }
          })
          .map((item: NoteI) => {
            const { id, title, note, date } = item;

            const copyToClipboard = () => {
              copy(note);
            };

            return (
              <Card
                key={id}
                sx={{
                  position: "relative",
                  minWidth: { xs: "90%", sm: "80%" },
                  m: "0 20px",
                  minHeight: 160,
                  marginTop: "50px",
                  background: colors.secondBackground[100],
                }}
              >
                <CardContent
                  sx={{
                    p: { xs: "13px 12px", sm: "20px 25px" },
                    background: colors.secondBackground[100],
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      color: colors.blue[100],
                      background: colors.secondBackground[100],
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Box sx={{ display: { xs: "block", sm: "none" } }}>
                      <ToolsMenu
                        note={note}
                        title={title}
                        id={id}
                        deleteNote={deleteNote}
                        copyToClipboard={copyToClipboard}
                      />
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                      <EditNoteModal note={note} title={title} id={id} />
                      <InfoSnackbar copyToClipboard={copyToClipboard} />
                      <DeleteModal deleteNote={deleteNote} id={id} />
                    </Box>
                  </Box>
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{ marginBottom: "20px", maxWidth: "80%" }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      style={{ whiteSpace: "pre-line", marginBottom: "8px" }}
                    >
                      {note}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ position: "absolute", bottom: "10px", right: "10px" }}
                  >
                    <Typography sx={{ fontSize: "12px" }}>{date}</Typography>
                  </Box>
                </CardContent>
              </Card>
            );
          })
      )}
    </Box>
  );
};

export default Note;
