import * as React from "react";
import Button from "@mui/material/Button";
import { SnackbarProvider, useSnackbar } from "notistack";
import { useState } from "react";

function MyApp({ successMessage }) {
  const { enqueueSnackbar } = useSnackbar();

  const variant = "success";
  enqueueSnackbar(successMessage, { variant });
}

export default function IntegrationNotistack({ successMessage }) {
  return (
    <SnackbarProvider maxSnack={1}>
      <MyApp successMessage={successMessage} />
    </SnackbarProvider>
  );
}
