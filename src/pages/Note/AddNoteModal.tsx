import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { FormControl, IconButton, TextField, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function NestedModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <div>
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
        <Box sx={{ ...style, minWidth: "800px", minHeight: "300px" }}>
          <Button
            onClick={handleClose}
            sx={{ position: "absolute", top: "20px", right: "25px" }}
          >
            <CloseIcon />
          </Button>
          <h2 id="parent-modal-title">Create new note</h2>
          <FormControl fullWidth onSubmit={() => handleSubmit}>
            <TextField fullWidth label="Title" sx={{ marginBottom: "30px" }} />
            <TextField
              id="outlined-multiline-static"
              label="Note"
              multiline
              rows={4}
              sx={{ width: "100%", marginBottom: "55px" }}
            />
            <Button
              type="submit"
              sx={{
                position: "absolute",
                bottom: "0px",
                right: "0px",
                border: "1px solid",
              }}
            >
              Create
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
}
