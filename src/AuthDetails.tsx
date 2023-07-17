import { useContext } from "react";
import { NavRight } from "./pages/Nav/NavRight";
import AuthDetailsIcon from "./AuthDetailsIcon";
import { AuthContext } from "./App";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./Theme";

interface User {
  email: string;
}

const AuthDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { authUser }: { authUser: User | null } = useContext(AuthContext);

  return (
    <Box>
      {authUser ? (
        <Box
          style={{
            display: "flex",
            marginRight: "30px",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Typography style={{ color: colors.secondary[100] }}>{`Signed In as ${
            typeof authUser === "string" ? "Unknown User" : authUser.email
          }`}</Typography>
          <AuthDetailsIcon />
        </Box>
      ) : (
        <NavRight />
      )}
    </Box>
  );
};

export default AuthDetails;
