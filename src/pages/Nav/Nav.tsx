import { Link } from "react-router-dom";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import AuthDetails from "../../AuthDetails";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const Nav = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: "100%", position: "fixed", top: "0", zIndex: "2" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height="70px"
      >
        <Box marginLeft={{ md: "80px", xs: "30px" }}>
          <Link
            to="/notebook"
            style={{ textDecoration: "none", color: colors.secondary[100] }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: "Spectral SC",
                display: "flex",
                gap: "10px",
              }}
            >
              <MenuBookIcon fontSize="large" sx={{ mb: "5px" }} /> Notebook
            </Typography>
          </Link>
        </Box>
        {/* Nav right */}
        <AuthDetails />
      </Box>
      <Divider variant="inset" sx={{ width: "100%", margin: "0" }} />
    </Box>
  );
};
