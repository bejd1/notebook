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
import ErrorIcon from "@mui/icons-material/Error";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  email: string;
  password: string;
}

export default function Login() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [authing, setAuthing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const auth = getAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { email, password } = data;
    login(email, password);
  };

  // login with email and password
  const login = async (email: string, password: string) => {
    setAuthing(true);
    try {
      await signInWithEmailAndPassword(auth, email, password).then(
        (response) => {
          console.log(response.user.uid);
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate("/notebook");
        }
      );
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  // login with google
  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
        console.log(response.user.uid);
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/notebook");
      });
    } catch (err) {
      console.log(err);
      setAuthing(false);
    }
  };

  // login with github
  const signInWithGithub = async () => {
    setAuthing(true);
    try {
      await signInWithPopup(auth, new GithubAuthProvider()).then((response) => {
        console.log(response.user.uid);
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/notebook");
      });
    } catch (error) {
      console.log(error);
      setAuthing(false);
    }
  };

  return (
    <Box
      sx={{
        height: { xs: "120vh", sm: "100vh" },
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
            onSubmit={handleSubmit(onSubmit)}
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
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  type="email"
                  sx={{
                    width: "100%",
                    color: colors.secondary[100],
                    borderColor: colors.secondary[100],
                  }}
                  label="Email"
                  variant="outlined"
                />
                {errors.email && (
                  <Typography
                    sx={{
                      p: "0",
                      mt: "8px",
                      color: "#ff3333",
                      display: "flex",
                      alignItems: "center",
                      gap: "1px",
                    }}
                    className="error"
                  >
                    <ErrorIcon /> Invalid email
                  </Typography>
                )}
              </Box>
              <Box sx={{ mb: "12px" }}>
                <TextField
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  type="password"
                  sx={{ width: "100%" }}
                  label="Password"
                  variant="outlined"
                />
                {errors.password && (
                  <Typography
                    sx={{
                      p: "0",
                      mt: "8px",
                      color: "#ff3333",
                      display: "flex",
                      alignItems: "center",
                      gap: "1px",
                    }}
                    className="error"
                  >
                    <ErrorIcon /> Password must have at least 6 characters
                  </Typography>
                )}
                {errorMessage && (
                  <Typography
                    sx={{
                      p: "0",
                      mt: "8px",
                      color: "#ff3333",
                      display: "flex",
                      alignItems: "center",
                      gap: "1px",
                    }}
                    className="error"
                  >
                    <ErrorIcon /> Incorrect email or password.
                  </Typography>
                )}
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
