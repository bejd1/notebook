import { Link } from "react-router-dom";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { tokens } from "../../Theme";
import AuthDetails from "../../AuthDetails";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export const Nav = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        top: "0",
        zIndex: "3",
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        height={{ md: "70px", xs: "60px" }}
      >
        <Box
          sx={{
            marginLeft: {
              "@media (min-width: 99px)": {
                marginLeft: "12px",
              },
              "@media (min-width: 400px)": {
                marginLeft: "15px",
              },
              "@media (min-width: 600px)": {
                marginLeft: "15px",
              },
              "@media (min-width: 900px)": {
                marginLeft: "40px",
              },
            },
          }}
        >
          <Link
            to="/notebook"
            style={{ textDecoration: "none", color: colors.secondary[100] }}
          >
            <Typography
              variant="h2"
              fontSize={{ xs: "26px", sm: "35px" }}
              sx={{
                fontFamily: "Spectral SC",
                display: "flex",
                gap: "10px",
              }}
            >
              <MenuBookIcon
                sx={{
                  mb: "5px",
                  fontSize: {
                    xs: "26px",
                    sm: "35px",
                    "@media (max-width: 400px)": {
                      display: "none",
                    },
                  },
                }}
              />
              Notebook
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
