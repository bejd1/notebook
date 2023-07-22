import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Box,
  IconButton,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useContext } from "react";
import { ColorModeContext, tokens } from "./Theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";

export default function BasicMenu() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box>
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
        <MenuItem
          sx={{ p: { xs: "4px 9px", sm: "6px 16px" } }}
          onClick={handleClose}
        >
          <ListItemText onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <LightModeOutlinedIcon />
                <Typography>Light Mode</Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <DarkModeOutlinedIcon />
                <Typography>Dark mode</Typography>
              </Box>
            )}
          </ListItemText>
        </MenuItem>

        <MenuItem
          sx={{ p: { xs: "4px 9px", sm: "6px 16px" } }}
          onClick={handleClose}
        >
          <ListItemText>
            <Box
              onClick={userSignOut}
              sx={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <LogoutIcon />
              <Typography>Logout</Typography>
            </Box>
          </ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  );
}
