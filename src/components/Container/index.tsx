import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: "1000px",
        padding: "0 15px",
        margin: "0 auto",
      }}
    >
      {children}
    </Box>
  );
};

export default Container;
