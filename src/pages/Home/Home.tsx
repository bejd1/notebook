import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import NoteTools from "../Note/NoteTools";
import { tokens } from "../../Theme";
import Balancer from "react-wrap-balancer";
import notebook from "../../img/laptop-lg.jpg";
import { useTypewriter } from "react-simple-typewriter";

interface User {
  email?: string;
  displayName?: string;
}

export const Home = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { authUser }: { authUser: User | null } = useContext(AuthContext);

  const [text] = useTypewriter({
    words: ["create...", "copy...", "edit...", "searching..."],
    loop: 20,
  });

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
            // flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              mb: "120px",
            }}
          >
            <Balancer>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "40px",
                  fontWeight: "bold",
                  maxWidth: "600px",
                }}
              >
                Smart and easy to use notebook
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: colors.secondary[100],
                  fontWeight: "300",
                  mt: "10px",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Save your notes in one place.
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: colors.secondary[100],
                  fontWeight: "300",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Easy to {text}
              </Typography>

              <Box sx={{ display: "flex", gap: "20px", mt: "20px" }}>
                <Button
                  sx={{
                    backgroundColor: colors.green[100],
                    fontWeight: "bold",
                    p: "6px 12px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to="/register"
                  >
                    Create account
                  </Link>
                </Button>
                <Button
                  sx={{
                    backgroundColor: colors.btn[100],
                    fontWeight: "bold",
                    p: "6px 12px",
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to="/login"
                  >
                    Notes
                  </Link>
                </Button>
              </Box>
            </Balancer>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={notebook}
              style={{ width: "90%" }}
              alt="a person who writes a note in a laptop"
              loading="lazy"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
