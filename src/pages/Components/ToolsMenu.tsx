import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditNoteModal from "./EditNoteModal";
import DeleteModal from "./DeleteModal";
import InfoSnackbar from "./SnackBar";
import { Box } from "@mui/material";

interface ToolsMenuProps {
  note: string;
  title: string;
  id: string;
  deleteNote: (id: string) => void;
  copyToClipboard: () => void;
}

export default function ToolsMenu({
  note,
  title,
  id,
  deleteNote,
  copyToClipboard,
}: ToolsMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ p: "4px", minWidth: "30px" }}
      >
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minWidth: "40px",
            gap: "3px",
          }}
        >
          <EditNoteModal note={note} title={title} id={id} />
          <InfoSnackbar copyToClipboard={copyToClipboard} />
          <DeleteModal deleteNote={deleteNote} id={id} />
        </Box>
      </Menu>
    </div>
  );
}
