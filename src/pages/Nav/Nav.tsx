import { Link } from "react-router-dom";
import "./Nav.css";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../Theme";
import PersonIcon from "../Note/PersonIcon";

export const Nav = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      height="70px"
    >
      <Box marginLeft="80px">
        <Link
          to="/tools"
          style={{ textDecoration: "none", color: colors.grey[100] }}
        >
          <Typography variant="h2" sx={{ color: colors.primary[100] }}>
            Notebook
          </Typography>
        </Link>
      </Box>

      <Box
        marginRight="80px"
        display="flex"
        alignItems="center"
        gap="20px"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="1px"
      >
        <Typography>login</Typography>
        <Button
          variant="text"
          sx={{
            color: colors.grey[100],
            fontWeight: "700",
            border: `1px solid ${colors.grey[100]}`,
            letterSpacing: "1px",
          }}
        >
          Register
        </Button>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <PersonIcon />
      </Box>
    </Box>
  );
};
