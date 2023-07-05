import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { NavRight } from "./pages/Nav/NavRight";
import AuthDetailsIcon from "./AuthDetailsIcon";

interface User {
  email: string;
}

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user as User);
      } else {
        setAuthUser(null);
      }
      console.log(user);
    });

    return () => {
      listen();
    };
  }, []);

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
