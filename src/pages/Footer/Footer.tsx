import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../Theme";

export const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        position: "absolute",
        bottom: "0",
        height: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography>
        &copy; {new Date().getFullYear()} Created by
        <a
          style={{ color: colors.secondary[100], marginLeft: "3px" }}
          href="https://www.linkedin.com/in/filip-bajdan-a6393b273/"
        >
          Bejdi
        </a>
      </Typography>
    </Box>
  );
};
