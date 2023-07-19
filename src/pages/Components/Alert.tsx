import Alert from "@mui/material/Alert";

export interface AlertProp {
  text: string;
}

const Alerts: React.FC<AlertProp> = ({ text }) => {
  return (
    <Alert severity="success" color="info">
      {text}
    </Alert>
  );
};

export default Alerts;
