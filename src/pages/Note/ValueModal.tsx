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
import { Edit } from "@mui/icons-material";
import { tokens } from "../../Theme";

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

interface ModalProps {
  btnName: string;
  title: string;
}

const ValueModal: React.FC<ModalProps> = ({ btnName, title }) => {
  const [open, setOpen] = React.useState(false);
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
  return (
    <Box sx={{}}>
      <Tooltip title="Create new note" sx={{ height: "100%" }}>
        <IconButton onClick={handleOpen}>
          {btnName === "Create" ? <AddIcon /> : <Edit />}
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
          <h2 id="parent-modal-title">{title}</h2>
          <FormControl fullWidth onSubmit={() => handleSubmit}>
            <TextField fullWidth label="Title" sx={{ marginBottom: "30px" }} />
            <TextField
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
              {btnName}
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </Box>
  );
};

export default ValueModal;
