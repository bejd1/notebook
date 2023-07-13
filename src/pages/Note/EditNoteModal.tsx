import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import {
  FormControl,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Edit } from "@mui/icons-material";
import { tokens } from "../../Theme";
import { database } from "../../Firebase";
import { ref, update } from "firebase/database";
import { useForm } from "react-hook-form";

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

interface EditI {
  note: string;
  title: string;
  id: string;
}

interface IEditFormInput {
  title: string;
  note: string;
  example: string;
}

const EditNoteModal = ({ title, note, id }: EditI) => {
  const [open, setOpen] = useState(false);
  const [editTitle, setEditTitle] = useState<string>(title);
  const [editNote, setEditNote] = useState<string>(note);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IEditFormInput>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = () => {
    const dateObject = new Date();
    const date = dateObject.toLocaleString("en-US", { timeZone: "CET" });
    update(ref(database, `notes/${id}`), {
      title: editTitle,
      note: editNote,
      date: date,
    });
    reset();
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <TextField
                {...register("title", {
                  required: true,
                  minLength: 3,
                })}
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                fullWidth
                label="Title"
                sx={{ mb: "8px" }}
              />
              {errors?.title?.type === "required" && (
                <Typography sx={{ color: "#ff3333" }}>
                  This field is required
                </Typography>
              )}
              {errors?.title?.type === "minLength" && (
                <Typography sx={{ color: "#ff3333" }}>
                  The minimum number of characters is 3.
                </Typography>
              )}
              <TextField
                {...register("note", {
                  required: true,
                  minLength: 3,
                })}
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                id="outlined-multiline-static"
                label="Note"
                multiline
                rows={5}
                sx={{ width: "100%", mt: "8px" }}
              />
              <Box sx={{ height: "60px" }}>
                {errors?.note?.type === "minLength" && (
                  <Typography sx={{ color: "#ff3333", mt: "8px" }}>
                    The minimum number of characters is 3.
                  </Typography>
                )}
                {errors?.note?.type === "required" && (
                  <Typography sx={{ color: "#ff3333", mt: "8px" }}>
                    This field is required
                  </Typography>
                )}
              </Box>
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
