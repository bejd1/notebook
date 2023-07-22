import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  IconButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import { tokens } from "../../Theme";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LoginIcon from "@mui/icons-material/Login";

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
      <IconButton
        onClick={handleClick}
        sx={{
          padding: {
            "@media (max-width: 450px)": {
              padding: "5px",
            },
          },
        }}
      >
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
        <MenuItem
          sx={{ p: { xs: "4px 9px", sm: "6px 16px" } }}
          onClick={handleClose}
        >
          <ListItemIcon
            sx={{ display: "flex", justifyContent: "center", gap: "5px" }}
          >
            <LoginIcon fontSize="small" sx={{ color: colors.secondary[100] }} />
            <ListItemText>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: colors.secondary[100] }}
              >
                Login
              </Link>
            </ListItemText>
          </ListItemIcon>
        </MenuItem>
        <MenuItem
          sx={{ p: { xs: "4px 9px", sm: "6px 16px" } }}
          onClick={handleClose}
        >
          <ListItemIcon
            sx={{ display: "flex", justifyContent: "center", gap: "7px" }}
          >
            <AppRegistrationIcon
              fontSize="small"
              sx={{ color: colors.secondary[100] }}
            />
            <ListItemText>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: colors.secondary[100] }}
              >
                Register
              </Link>
            </ListItemText>
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </Box>
  );
}
