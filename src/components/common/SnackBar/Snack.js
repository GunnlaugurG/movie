import React from "react";
import { useTheme } from '@material-ui/core/styles';
import { Snackbar, useMediaQuery } from "@material-ui/core";
import MySnackbarContentWrapper from "./SnackBar.js";

export default function Snack(props) {
  const { SnackBaropen, setOpenSnackBar, message, variant } = props;
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: !matches ? 'bottom' : 'top',
        horizontal: "center"
      }}
      open={SnackBaropen}
      autoHideDuration={2000}
      onClose={handleSnackBarClose}
    >
      <MySnackbarContentWrapper
        onClose={handleSnackBarClose}
        variant={variant}
        message={message}
      />
    </Snackbar>
  );
}