import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        position: "relative",
        bottom: "0",
        height: "30px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography>Created by bejdi</Typography>
    </Box>
  );
};
