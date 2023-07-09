import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  FormControl,
  IconButton,
  TextField,
  Tooltip,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../Theme";
import { useState } from "react";
import { database } from "../../Firebase";
import { push, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute" as "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const AddNoteModal = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const addTodo = () => {
    const noteRef = ref(database, "/notes");
    const id = uuidv4();
    const dateObject = new Date();
    let date = dateObject.toLocaleString("en-US", { timeZone: "CET" });
    const todo = {
      id: id,
      title: title,
      note: note,
      date: date,
    };
    push(noteRef, todo);
    console.log(date);

    // clear inputs and close modal
    setTitle("");
    setNote("");
    setOpen(false);
  };

  return (
    <Box>
      <Tooltip title="Create new note" sx={{ height: "100%" }}>
        <IconButton onClick={handleOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            minWidth: "80%",
            minHeight: "300px",
            background: colors.color[100],
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ position: "absolute", top: "20px", right: "25px" }}
          >
            <CloseIcon />
          </Button>
          <h2 id="parent-modal-title">Add new note</h2>
          <FormControl fullWidth onSubmit={() => handleSubmit}>
            <TextField
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              fullWidth
              label="Title"
              sx={{ marginBottom: "30px" }}
            />
            <TextField
              value={note}
              onChange={(e) => setNote(e.target.value)}
              id="outlined-multiline-static"
              label="Note"
              multiline
              rows={5}
              sx={{ width: "100%", marginBottom: "55px" }}
            />
            <Button
              onClick={addTodo}
              type="submit"
              variant="contained"
              sx={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                border: "none",
                color: "#fff",
                background: colors.btn[100],
              }}
            >
              Add note
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddNoteModal;
