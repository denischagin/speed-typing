import { Alert, AlertColor, Snackbar } from "@mui/material";
import React, { FC } from "react";

interface SnackbarWithAlert {
  open: boolean;
  onClose: () => void;
  severity: AlertColor;
  backgroundColor: string;
  text: string;
}

const SnackbarWithAlert: FC<SnackbarWithAlert> = ({
  open,
  onClose,
  severity,
  backgroundColor,
  text: alertText
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        sx={{ width: "100%", backgroundColor }}
      >
        {alertText}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarWithAlert;
