import { Link } from "react-router-dom";
import "./Nav.css";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import AuthDetails from "../../AuthDetails";

export const Nav = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height="70px"
      >
        <Box marginLeft={{ md: "80px", xs: "30px" }}>
          <Link
            to="/tools"
            style={{ textDecoration: "none", color: colors.secondary[100] }}
          >
            <Typography variant="h1" sx={{ fontFamily: "Spectral SC" }}>
              Notebook
            </Typography>
          </Link>
        </Box>
        <AuthDetails />
      </Box>
      <Divider
        variant="inset"
        sx={{ width: "100%", margin: "0", mb: "30px" }}
      />
    </Box>
  );
};
