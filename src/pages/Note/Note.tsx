import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import DeleteModal from "./DeleteModal";
import InfoSnackbar from "./SnackBar";
import EditNoteModal from "./EditNoteModal";
import { useEffect, useState } from "react";
import { database } from "../../Firebase";
import { off, onValue, ref, remove } from "firebase/database";
import copy from "copy-to-clipboard";

interface NoteI {
  id: string;
  title: string;
  note: string;
  date: number;
}

const Note = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState<NoteI[]>([]);

  // set data

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
      console.log(notes);
    });

    return () => {
      off(notesRef, "value", notesListener as any);
    };
  }, []);

  // delete note

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
  // sort
  const [order, setOrder] = useState<"ASC" | "DSC">("ASC");

  const sorting = (col: keyof NoteI) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    } else {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
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
      <Button onClick={() => sorting("date")}>
        {order === "ASC" ? "Sort Oldest First" : "Sort Latest First"}
      </Button>
      {data.length === 0 ? (
        <Typography variant="h3" sx={{ mt: "50px" }}>
          Your notes are empty.
        </Typography>
      ) : (
        data.map((item) => {
          const { id, title, note } = item;
          const copyToClipboard = () => {
            copy(note);
          };

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
                  <EditNoteModal note={note} title={title} id={id} />
                  {/* Info about copy */}
                  <InfoSnackbar copyToClipboard={copyToClipboard} />
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
