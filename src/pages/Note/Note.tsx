import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import DeleteModal from "./DeleteModal";
import InfoSnackbar from "./SnackBar";
import EditNoteModal from "./EditNoteModal";
import { database } from "../../Firebase";
import { ref, remove } from "firebase/database";
import copy from "copy-to-clipboard";
import { Dispatch, SetStateAction } from "react";

interface NoteI {
  id: string;
  title: string;
  note: string;
  date: number;
}

type NoteProps = {
  setData: Dispatch<SetStateAction<NoteI[]>>;
  data: NoteI[];
};

const Note = ({ setData, data }: NoteProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // delete note

  const deleteNote = (id: string) => {
    const noteRef = ref(database, `notes/${id}`);

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
      {data.length === 0 ? (
        <Typography variant="h3" sx={{ mt: "50px" }}>
          Your notes are empty.
        </Typography>
      ) : (
        data.map((item: NoteI) => {
          const { id, title, note, date } = item;
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
