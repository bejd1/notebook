import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Tooltip, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { tokens } from "../../Theme";

const style = {
  position: "absolute" as "absolute",
  top: "45%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  boxShadow: 24,
  p: 4,
};

interface DeleteModalProps {
  deleteNote: (id: string) => void;
  id: string;
}

export default function DeleteModal({ deleteNote, id }: DeleteModalProps) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = () => {
    deleteNote(id);
    handleClose();
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={handleOpen}>
          <DeleteIcon style={{ color: colors.secondary[100] }} />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, background: colors.secondBackground[100] }}>
          <Typography
            id="modal-modal-title"
            variant="h3"
            component="h2"
            textAlign="center"
          >
            You want to delete this note?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              gap: "50px",
            }}
          >
            <Button
              onClick={handleDelete}
              variant="contained"
              size="large"
              sx={{
                border: "none",
                backgroundColor: colors.green[100],
                color: "white",
                fontWeight: "bold",
              }}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              size="large"
              sx={{
                border: "none",
                backgroundColor: colors.red[100],
                color: "white",
                fontWeight: "bold",
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
