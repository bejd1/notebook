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
import { onValue, ref } from "firebase/database";

interface noteI {
  title: string;
  note: string;
  index: number;
}

export default function Note() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState<noteI[]>([]);

  useEffect(() => {
    const todoRef = ref(database, "/notes");

    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList: noteI[] = [];

      for (let id in todos) {
        newTodoList.push({ id, ...todos[id] });
      }

      setData(newTodoList);
    });
  }, []);

  const deleteNote = (index: number) => {
    setData((current) => current.filter((note) => note.index !== index));
    console.log("essa");
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
      {data.map((item, index) => {
        const { title, note } = item;
        return (
          <Card
            key={index}
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
                <DeleteModal deleteNote={deleteNote} />
              </Box>
              <Box>
                <Box>
                  <Typography variant="h3" sx={{ marginBottom: "20px" }}>
                    {title}
                  </Typography>
                  <Typography>{note}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}
