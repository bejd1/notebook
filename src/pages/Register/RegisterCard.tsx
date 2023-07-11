import Card from "@mui/material/Card";
import { Register } from "./Register";

export default function BasicCard() {
  return (
    <Card sx={{ width: "520px", marginTop: "140px" }}>
      <Register />
    </Card>
  );
}
