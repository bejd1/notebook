import { Link, useNavigate } from "react-router-dom";
import { Google } from "react-bootstrap-icons";
import Card from "@mui/material/Card";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  getAuth,
} from "firebase/auth";
import { tokens } from "../../Theme";

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
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <Card sx={{ width: "520px", marginTop: "140px" }}>
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
              m: "40px 0 20px",
              color: colors.secondary[100],
            }}
          >
            Log Into My Account
          </Typography>
          <Button
            onClick={signInWithGoogle}
            disabled={authing}
            sx={{
              border: "1px solid",
              borderColor: colors.secondary[100],
              width: "80%",
              mt: "10px",
              p: "10px 0",
              color: colors.secondary[100],
            }}
          >
            <Google style={{ marginRight: "5px" }} /> Sign in with Google
          </Button>
          <Typography sx={{ m: "5px 0", color: colors.secondary[100] }}>
            or
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
                  id="outlined-basic"
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
                  id="outlined-basic"
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
                  borderColor: colors.secondary[100],
                  width: "100%",
                  mt: "5px",
                  p: "10px 0",
                  color: colors.secondary[100],
                }}
              >
                Log In
              </Button>
              <Typography
                sx={{
                  m: "10px 0",
                  fontSize: "13px",
                  margin: "20px 0",
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
      </Card>
    </Box>
  );
}
