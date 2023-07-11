import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import backgroundImage from "../../img/laptop-lg.jpg";

export const Home = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        boxShadow: "inset 0 0 0 1000px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          mb: "40px",
          fontSize: "50px",
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Online notebook
      </Typography>
      <Typography
        sx={{
          mb: "10px",
          color: "#fff",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        SAVE YOUR NOTICE
      </Typography>
      <Typography
        sx={{
          mb: "10px",
          color: "#fff",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Sign up for a FREE Grow account
      </Typography>
      <Typography
        sx={{
          mb: "10px",
          color: "#fff",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        to save and share your notice in one place!
      </Typography>
      <Box>
        <Link to="/register">
          <Button sx={{ background: "royalblue" }}>Sign up Today</Button>
        </Link>
        <Link to="/tools">
          <Button sx={{ background: "royalblue", marginLeft: "20px" }}>
            Notes
          </Button>
        </Link>
      </Box>
    </Box>
  );
};
