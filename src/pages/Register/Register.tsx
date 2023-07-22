import Card from "@mui/material/Card";
import ErrorIcon from "@mui/icons-material/Error";
import {
  Box,
  Button,
  Divider,
  IconButton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { tokens } from "../../Theme";
import { GitHub } from "@mui/icons-material";

interface IFormInput {
  email: string;
  password: string;
}

export default function Register() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [authing, setAuthing] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { email, password } = data;
    signUp(email, password);
  };

  // create account by email
  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          console.log(userCredential);
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate("/notebook");
        }
      );
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  // register with google
  const signInWithGoogle = async () => {
    setAuthing(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider()).then((response) => {
        console.log(response.user.uid);
        window.scrollTo({ top: 0, behavior: "smooth" });
        navigate("/notebook");
      });
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message);
      setAuthing(false);
    }
  };

  // login with github
  const signInWithGithub = async () => {
    try {
      const response = await signInWithPopup(auth, new GithubAuthProvider());
      console.log(response.user.uid);
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/notebook");
    } catch (error: any) {
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
              textAlign: "center",
            }}
          >
            Start save notice for free
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
                  autoFocus
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  type="email"
                  sx={{ width: "100%" }}
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
                    <ErrorIcon /> Sorry, that email is already taken
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
                Create account
              </Button>
              <Typography
                sx={{
                  fontSize: "13px",
                  mt: "10px ",
                  textAlign: "center",
                }}
              >
                Have an account?
                <Link
                  style={{ color: colors.secondary[100], marginLeft: "3px" }}
                  to="/login"
                >
                  Sign In
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
