import * as React from "react";
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

interface DeleteProp {
  deleteNote: (index: number) => void;
}

export default function DeleteModal({ deleteNote }: DeleteProp) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton onClick={handleOpen}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, background: colors.color[100] }}>
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
              variant="contained"
              size="large"
              sx={{
                border: "none",
                backgroundColor: colors.green[100],
                color: "white",
              }}
            >
              Yes
            </Button>
            <button onClick={() => deleteNote}>fasdfdsa</button>
            <Button
              variant="contained"
              onClick={handleClose}
              size="large"
              sx={{
                border: "none",
                backgroundColor: colors.red[100],
                color: "white",
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
