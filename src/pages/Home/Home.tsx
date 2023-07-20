import { Box, Button, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../App";
import NoteTools from "../Note/NoteTools";
import { tokens } from "../../Theme";
import notebook from "../../img/laptop-lg.png";
import { useTypewriter } from "react-simple-typewriter";
import { User } from "../../types/types";

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
            minHeight: "100vh",
            width: "100%",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: {
              lg: "row",
              xs: "column",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: { xs: "center", md: "left" },
              width: "100%",
              mb: { lg: "150px", md: "0" },
              mt: { xs: "0", md: "90px" },
              ml: { lg: "40px" },
            }}
          >
            <Box p=" 0 20px">
              <Typography
                variant="h2"
                sx={{
                  fontSize: { sx: "35px", sm: "40px", md: "50px" },
                  fontWeight: "bold",
                  maxWidth: "600px",
                }}
              >
                Smart and easy to use notebook
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: { sx: "18", sm: "24px", md: "27px" },
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
                  fontSize: { sx: "18", sm: "24px", md: "27px" },
                  color: colors.secondary[100],
                  fontWeight: "300",
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                Easy to {text}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "left" },
                  gap: "20px",
                  mt: "20px",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: colors.green[100],
                    fontWeight: "bold",
                    p: "6px 12px",
                    fontSize: { xs: "12px", sm: "14px" },
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": { backgroundColor: colors.greenHover[100] },
                  }}
                >
                  <Link
                    style={{ color: "#fff", textDecoration: "none" }}
                    to="/register"
                  >
                    Sing up for free!
                  </Link>
                </Button>
                <Button
                  sx={{
                    backgroundColor: colors.blue[100],
                    fontWeight: "bold",
                    p: "6px 12px",
                    fontSize: { xs: "12px", sm: "14px" },
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
                    "&:hover": { backgroundColor: colors.blueHover[100] },
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
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: {
                lg: "left",
                xs: "center",
              },
              width: {
                xs: "85%",
                sm: "70%",
                lg: "95%",
              },
              mt: { xs: "30px", lg: "0" },
              marginRight: { lg: "80px" },
            }}
          >
            <img
              src={notebook}
              style={{
                width: "100%",
                borderRadius: "12px",
              }}
              alt="a person who writes a note in a laptop"
              loading="lazy"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
