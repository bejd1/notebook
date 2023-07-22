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

const ToolsMenu: React.FC<ToolsMenuProps> = ({
  note,
  title,
  id,
  deleteNote,
  copyToClipboard,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
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
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          pb: "0",
          m: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            minWidth: "40px",
            p: "0",
          }}
        >
          <EditNoteModal
            handleCloseMenu={handleCloseMenu}
            note={note}
            title={title}
            id={id}
          />
          <InfoSnackbar
            handleCloseMenu={handleCloseMenu}
            copyToClipboard={copyToClipboard}
          />
          <DeleteModal
            handleCloseMenu={handleCloseMenu}
            id={id}
            deleteNote={deleteNote}
          />
        </Box>
      </Menu>
    </Box>
  );
};

export default ToolsMenu;
