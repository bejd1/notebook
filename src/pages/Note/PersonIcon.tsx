import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton, ListItemText, Tooltip } from "@mui/material";
import { Person } from "react-bootstrap-icons";
// import CallMadeIcon from "@mui/icons-material/CallMade";
// import CallReceivedIcon from "@mui/icons-material/CallReceived";

export default function BasicMenu() {
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
      <Tooltip title="Options">
        <IconButton onClick={handleClick}>
          <Person />
        </IconButton>
      </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          {/* <ListItemIcon>
            <CallReceivedIcon fontSize="small" />
          </ListItemIcon> */}
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {/* <ListItemIcon>
            <CallMadeIcon fontSize="small" />
          </ListItemIcon> */}
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}
