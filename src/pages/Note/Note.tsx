import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import DeleteModal from "./DeleteModal";
import InfoSnackbar from "./SnackBar";
import EditNoteModal from "./EditNoteModal";
import { useEffect, useState } from "react";
import { database } from "../../Firebase";
import { off, onValue, ref, remove } from "firebase/database";

interface NoteI {
  id: string;
  title: string;
  note: string;
}

const Note = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState<NoteI[]>([]);

  useEffect(() => {
    const notesRef = ref(database, "notes");

    const notesListener = onValue(notesRef, (snapshot) => {
      const notes: NoteI[] = [];
      snapshot.forEach((childSnapshot) => {
        const note = childSnapshot.val();
        note.id = childSnapshot.key;
        notes.push(note);
      });
      setData(notes);
    });

    return () => {
      // Cleanup the listener when the component unmounts
      off(notesRef, "value", notesListener as any);
    };
  }, []);

  const deleteNote = (id: string) => {
    const noteRef = ref(database, `notes/${id}`);

    remove(noteRef)
      .then(() => {
        console.log("Note deleted successfully");
        // Remove the deleted note from the state
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
      {data.length === 0 ? (
        <Typography variant="h3" sx={{ mt: "50px" }}>
          Your notes is empty.
        </Typography>
      ) : (
        data.map((item) => {
          const { id, title, note } = item;

          return (
            <Card
              key={id}
              sx={{
                position: "relative",
                minWidth: "80%",
                maxWidth: "80%",
                minHeight: 160,
                marginTop: "50px",
                background: colors.color[100],
              }}
            >
              <CardContent sx={{ p: "20px 25px" }}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    color: colors.color[100],
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* Edit modal */}
                  <EditNoteModal />
                  {/* Info about copy */}
                  <InfoSnackbar />
                  {/* Delete modal */}
                  <DeleteModal deleteNote={deleteNote} id={id} />
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ marginBottom: "20px" }}>
                    {title}
                  </Typography>
                  <Typography>{note}</Typography>
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
