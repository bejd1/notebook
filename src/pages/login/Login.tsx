import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
  GithubAuthProvider,
} from "firebase/auth";
import { tokens } from "../../Theme";
import { GitHub } from "@mui/icons-material";

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authing, setAuthing] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  // login with email and password
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthing(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (response) => {
          console.log(response.user.uid);
          navigate("/notebook");
        }
      );
    } catch (err) {
      console.log(err);
      setAuthing(false);
    }
  };

  // login with google
  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
        console.log(response.user.uid);
        navigate("/notebook");
      });
    } catch (err) {
      console.log(err);
      setAuthing(false);
    }
  };

  // login with github
  const signInWithGithub = async () => {
    try {
      const response = await signInWithPopup(auth, new GithubAuthProvider());
      console.log(response.user.uid);
      navigate("/notebook");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "520px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          margin: "0 15px",
          mb: { md: "100px", xs: "30px" },
          mt: "55px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              m: "40px 20px 25px",
              color: colors.secondary[100],
            }}
            textAlign="center"
          >
            Log Into My Account
          </Typography>

          <form
            onSubmit={login}
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box sx={{ mb: "12px" }}>
                <TextField
                  autoFocus
                  type="email"
                  sx={{
                    width: "100%",
                    color: colors.secondary[100],
                    borderColor: colors.secondary[100],
                  }}
                  label="Email"
                  variant="outlined"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </Box>
              <Box sx={{ mb: "12px" }}>
                <TextField
                  type="password"
                  sx={{ width: "100%" }}
                  label="Password"
                  variant="outlined"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
              </Box>
              <Button
                type="submit"
                sx={{
                  border: "1px solid",
                  width: "100%",
                  mt: "5px",
                  p: "10px 0",
                  color: "#fff",
                  borderColor: colors.border[100],
                  backgroundColor: colors.blue[100],
                  fontWeight: "bold",
                  "&:hover": { backgroundColor: colors.blueHover[100] },
                }}
              >
                Log In
              </Button>
              <Typography
                sx={{
                  fontSize: "13px",
                  mt: "10px ",
                  textAlign: "center",
                }}
              >
                <Link
                  style={{
                    marginLeft: "5px",
                    color: colors.secondary[100],
                  }}
                  to="/register"
                >
                  Don't have an account?
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Divider sx={{ width: "80%", mt: "5px" }}>or</Divider>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={signInWithGoogle}
              style={{ marginBottom: "10px" }}
              disabled={authing}
            >
              <img
                style={{ height: "30px" }}
                src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                alt="google logo"
              />
            </IconButton>
            <IconButton
              onClick={signInWithGithub}
              style={{ marginBottom: "10px" }}
            >
              <GitHub sx={{ color: colors.secondary[100] }} />
            </IconButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
