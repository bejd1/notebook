import { useContext } from "react";
import { NavRight } from "./pages/Nav/NavRight";
import AuthDetailsIcon from "./AuthDetailsIcon";
import { AuthContext } from "./App";

interface User {
  email: string;
}

const AuthDetails = () => {
  const { authUser }: { authUser: User | null } = useContext(AuthContext);

  return (
    <div>
      {authUser ? (
        <div
          style={{
            display: "flex",
            marginRight: "30px",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <p>{`Signed In as ${
            typeof authUser === "string" ? "Unknown User" : authUser.email
          }`}</p>
          <AuthDetailsIcon />
        </div>
      ) : (
        <NavRight />
      )}
    </div>
  );
};

export default AuthDetails;
