import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Spinner() {
  return (
    <Box className=" flex justify-center  items-center h-screen z-50">
      <CircularProgress disableShrink color="success" />
    </Box>
  );
}
