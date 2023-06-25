import Card from "@mui/material/Card";
import { Login } from "./Login";

export default function BasicCard() {
  return (
    <Card sx={{ maxWidth: 520 }}>
      <Login />
    </Card>
  );
}
