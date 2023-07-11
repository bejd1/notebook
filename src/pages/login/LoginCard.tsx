import Card from "@mui/material/Card";
import { Login } from "./Login";

export default function BasicCard() {
  return (
    <Card sx={{ width: "520px", marginTop: "140px" }}>
      <Login />
    </Card>
  );
}
