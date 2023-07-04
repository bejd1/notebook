import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton, ListItemText } from "@mui/material";
import { Person } from "react-bootstrap-icons";

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
    <Box display={{ md: "none", xs: "block" }}>
      <IconButton onClick={handleClick}>
        <Person />
      </IconButton>

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
          <ListItemText>Login</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText>Register</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
