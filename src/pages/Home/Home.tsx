import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import backgroundImage from "../../img/laptop-lg.jpg";
import { useContext } from "react";
import { AuthContext } from "../../App";
import NoteTools from "../Note/NoteTools";

interface User {
  email?: string;
  displayName?: string;
}

export const Home = () => {
  const { authUser }: { authUser: User | null } = useContext(AuthContext);

  return (
    <Box sx={{ width: "100%" }}>
      {authUser ? (
        <NoteTools />
      ) : (
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              p: "40px 80px",
              borderRadius: "8px",
              border: "0.2px solid white",
              boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.4)",
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
                fontSize: "25px",
                color: "#fff",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              SAVE YOUR NOTICE
            </Typography>
            <Typography
              sx={{
                mb: "10px",
                fontSize: "20px",
                color: "#fff",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              Sign up for a FREE Grow account
            </Typography>
            <Typography
              sx={{
                mb: "10px",
                fontSize: "20px",
                color: "#fff",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              to save and share your notice in one place!
            </Typography>
            <Box>
              <Link to="/register">
                <Button
                  sx={{
                    background: "royalblue",
                    boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Sign up Today
                </Button>
              </Link>
              <Link to="/tools">
                <Button
                  sx={{
                    background: "royalblue",
                    marginLeft: "20px",
                    boxShadow: "0 0 10px 5px rgba(0, 0, 0, 0.4)",
                  }}
                >
                  Notes
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
