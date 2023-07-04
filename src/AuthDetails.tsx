import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "./Firebase";
import { NavRight } from "./pages/Nav/NavRight";

interface User {
  email: string;
}

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user as User); // Cast user as User type
      } else {
        setAuthUser(null);
      }
      console.log(user);
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };
  console.log(authUser);

  return (
    <div>
      {authUser ? (
        <div style={{ display: "flex", marginRight: "30px", gap: "20px" }}>
          <p>{`Signed In as ${
            typeof authUser === "string" ? "Unknown User" : authUser.email
          }`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </div>
      ) : (
        <NavRight />
      )}
    </div>
  );
};

export default AuthDetails;
