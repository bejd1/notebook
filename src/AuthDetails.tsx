import { useContext } from "react";
import { NavRight } from "./pages/Nav/NavRight";
import AuthDetailsIcon from "./AuthDetailsIcon";
import { AuthContext } from "./App";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "./Theme";

interface User {
  email: string;
  displayName?: string;
}

const AuthDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { authUser }: { authUser: User | null } = useContext(AuthContext);

  return (
    <Box>
      {authUser ? (
        <Box
          sx={{
            display: "flex",
            marginRight: {
              "@media (min-width: 700px)": {
                marginRight: "30px",
              },
              "@media (max-width: 699px)": {
                marginRight: "6px",
              },
            },
            gap: "10px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: colors.secondary[100],
              display: {
                "@media (max-width: 700px)": {
                  display: "none",
                },
              },
            }}
          >{`Signed In as ${
            typeof authUser === "string" ? "Unknown User" : authUser.email
          }`}</Typography>
          {/* menu */}
          <AuthDetailsIcon />
        </Box>
      ) : (
        <NavRight />
      )}
    </Box>
  );
};

export default AuthDetails;
