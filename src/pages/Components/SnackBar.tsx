import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert, IconButton, Tooltip, useTheme } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { tokens } from "../../Theme";

interface State extends SnackbarOrigin {
  open: boolean;
}

interface CopyToClipboardI {
  copyToClipboard: () => void;
}

export default function InfoSnackbar({ copyToClipboard }: CopyToClipboardI) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ ...newState, open: true });
    copyToClipboard();
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const buttons = (
    <React.Fragment>
      <Tooltip title="Copy">
        <IconButton
          sx={{ p: { xs: "5px", sm: "8px" } }}
          onClick={handleClick({ vertical: "top", horizontal: "right" })}
        >
          <ContentCopyIcon style={{ color: colors.secondary[100] }} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
      {buttons}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            mt: { xs: "45px", sm: "38px" },
            mr: { xs: "0", sm: "20px" },
            backgroundColor: colors.green[100],
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          You copied your note.
        </Alert>
      </Snackbar>
    </Box>
  );
}
