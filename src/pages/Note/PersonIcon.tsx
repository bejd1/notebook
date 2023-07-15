import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, IconButton, ListItemText, useTheme } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { tokens } from "../../Theme";

export default function BasicMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
        <PersonIcon style={{ color: colors.secondary[100] }} />
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
          <ListItemText>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: colors.secondary[100] }}
            >
              Login
            </Link>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemText>
            <Link
              to="/register"
              style={{ textDecoration: "none", color: colors.secondary[100] }}
            >
              Register
            </Link>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
