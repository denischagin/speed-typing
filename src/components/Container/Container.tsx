import { Box } from "@mui/material";
import React from "react";

const Container = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: "1000px",
        padding: "0 15px",
        margin: "0 auto",
        marginBottom: "10px",
        gap: "30px",
      }}
    ></Box>
  );
};

export default Container;
