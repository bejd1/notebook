import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { Edit } from "@mui/icons-material";
import { tokens } from "../../Theme";
import { database } from "../../Firebase";
import { ref, update } from "firebase/database";

const style = {
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface EditI {
  note: string;
  title: string;
  id: string;
}

const EditNoteModal = ({ title, note, id }: EditI) => {
  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editNote, setEditNote] = useState<string>(note);

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

    const dateObject = new Date();
    let date = dateObject.toLocaleString("en-US", { timeZone: "CET" });
    update(ref(database, `notes/${id}`), {
      title: editTitle,
      note: editNote,
      date: date,
    });

    handleClose();
  };

  return (
    <Box>
      <Tooltip title="Edit note">
        <IconButton onClick={handleOpen}>
          <Edit />
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
          <h2 id="parent-modal-title">Edit note</h2>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
              <TextField
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth
                label="Title"
                sx={{ marginBottom: "30px" }}
              />
              <TextField
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                id="outlined-multiline-static"
                label="Note"
                multiline
                rows={5}
                sx={{ width: "100%", marginBottom: "55px" }}
              />
              <Button
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
                Edit
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default EditNoteModal;
