import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonIcon from "../Components/PersonIcon";
import { ColorModeContext, tokens } from "../../Theme";
import { useContext } from "react";

export const NavRight = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="20px"
      textTransform="uppercase"
      fontWeight="bold"
      letterSpacing="1px"
      sx={{
        marginRight: {
          "@media (min-width: 100px)": {
            marginRight: "8px",
          },
          "@media (min-width: 600px)": {
            marginRight: "25px",
          },
          "@media (min-width: 900px)": {
            marginRight: "40px",
          },
        },
      }}
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
            letterSpacing: "1.6",
            backgroundColor: colors.blue[100],
            fontWeight: "bold",
            color: "#fff",
            "&:hover": { backgroundColor: colors.blueHover[100] },
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
      <Box sx={{ display: "flex", alignItems: "center" }} gap={{ xs: "0" }}>
        <IconButton
          onClick={colorMode.toggleColorMode}
          sx={{
            padding: {
              "@media (max-width: 450px)": {
                padding: "5px",
              },
            },
          }}
        >
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon sx={{ color: colors.secondary[100] }} />
          ) : (
            <DarkModeOutlinedIcon sx={{ color: colors.secondary[100] }} />
          )}
        </IconButton>
        {/* icon menu */}
        <PersonIcon />
      </Box>
    </Box>
  );
};
