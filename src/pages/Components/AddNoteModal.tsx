import * as React from "react";
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
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../Theme";
import { auth, database } from "../../Firebase";
import { push, ref } from "firebase/database";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import ErrorIcon from "@mui/icons-material/Error";
import { IFormInput } from "../../types/types";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: IFormInput) => {
    const noteRef = ref(database, `users/${auth.currentUser?.uid}/items/`);
    const id = uuidv4();
    const dateObject = new Date();
    const date = dateObject.toLocaleString("en-US", { timeZone: "CET" });
    const todo = {
      id: id,
      title: data.title,
      note: data.note,
      date: date,
    };
    push(noteRef, todo);

    // clear inputs and close modal
    reset();
    setOpen(false);
  };

  return (
    <Box>
      <Tooltip title="Create new note" sx={{ height: "100%" }}>
        <IconButton onClick={handleOpen}>
          <AddIcon style={{ color: colors.secondary[100] }} />
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
            background: colors.secondBackground[100],
          }}
        >
          <Button
            onClick={handleClose}
            sx={{ position: "absolute", top: "20px", right: "25px" }}
          >
            <CloseIcon />
          </Button>
          <h2 id="parent-modal-title">Add new note</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <TextField
                {...register("title", {
                  required: true,
                  minLength: 3,
                })}
                fullWidth
                label="Title"
                sx={{ mb: "8px" }}
              />
              {errors?.title?.type === "required" && (
                <Typography
                  sx={{
                    color: "#ff3333",
                    display: "flex",
                    alignItems: "center",
                    gap: "1px",
                  }}
                >
                  <ErrorIcon /> This field is required
                </Typography>
              )}
              {errors?.title?.type === "minLength" && (
                <Typography
                  sx={{
                    color: "#ff3333",
                    display: "flex",
                    alignItems: "center",
                    gap: "1px",
                  }}
                >
                  <ErrorIcon /> The minimum number of characters is 3.
                </Typography>
              )}
              <TextField
                {...register("note", {
                  required: true,
                  minLength: 3,
                })}
                id="outlined-multiline-static"
                label="Note"
                multiline
                rows={5}
                sx={{ width: "100%", mt: "8px" }}
              />
              <Box sx={{ height: "60px" }}>
                {errors?.note?.type === "minLength" && (
                  <Typography
                    sx={{
                      color: "#ff3333",
                      m: "8px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "1px",
                    }}
                  >
                    <ErrorIcon /> The minimum number of characters is 3.
                  </Typography>
                )}
                {errors?.note?.type === "required" && (
                  <Typography
                    sx={{
                      color: "#ff3333",
                      m: "8px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "1px",
                    }}
                  >
                    <ErrorIcon /> This field is required
                  </Typography>
                )}
              </Box>
              <Button
                onClick={handleSubmit(onSubmit)}
                variant="contained"
                sx={{
                  position: "absolute",
                  bottom: "0px",
                  right: "0px",
                  border: "none",
                  color: "#fff",
                  background: colors.blue[100],
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: colors.blueHover[100] },
                }}
              >
                Add note
              </Button>
            </FormControl>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddNoteModal;
