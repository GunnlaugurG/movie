import React from "react";
import { Snackbar } from "@material-ui/core";
import MySnackbarContentWrapper from "./SnackBar.js";

export default function Snack(props) {
  const { SnackBaropen, setOpenSnackBar, message, variant } = props;

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
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