import { Link } from "react-router-dom";
import "./Nav.css";
export const Nav = () => {
  return (
    <div className="Nav">
      <Link to="/notebook">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/note">Notebook</Link>
    </div>
  );
};
