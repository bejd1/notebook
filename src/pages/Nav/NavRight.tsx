import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonIcon from "../Note/PersonIcon";
import { ColorModeContext, tokens } from "../../Theme";
import { useContext } from "react";
export const NavRight = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      marginRight={{ md: "80px", xs: "30px" }}
      display="flex"
      alignItems="center"
      gap="20px"
      textTransform="uppercase"
      fontWeight="bold"
      letterSpacing="1px"
    >
      <Box display={{ md: "flex", xs: "none" }} alignItems="center" gap="30px">
        <Typography letterSpacing="1.6" sx={{ color: colors.secondary[100] }}>
          <Link
            style={{ textDecoration: "none", color: colors.secondary[100] }}
            to="/login"
          >
            login
          </Link>
        </Typography>
        <Button
          variant="contained"
          sx={{
            disabled: "false",
            fontWeight: "500",
            letterSpacing: "1.6",
            backgroundColor: colors.btn[100],
            color: "#fff",
            "&:hover": { backgroundColor: "none" },
          }}
        >
          <Link
            style={{ textDecoration: "none", color: "#fff" }}
            to="/register"
          >
            Register
          </Link>
        </Button>
      </Box>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
      <PersonIcon />
    </Box>
  );
};
