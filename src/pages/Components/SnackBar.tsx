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
          onClick={handleClick({ vertical: "top", horizontal: "right" })}
        >
          <ContentCopyIcon style={{ color: colors.secondary[100] }} />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  );

  return (
    <Box>
      {buttons}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%", mt: "38px", mr: "20px" }}
        >
          You copied your note.
        </Alert>
      </Snackbar>
    </Box>
  );
}
