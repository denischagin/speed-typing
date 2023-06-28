import React, { FC } from "react";
import Key from "./KeyboardRow/Key";
import KeyboardRow from "./KeyboardRow";
import { Box, SxProps } from "@mui/material";
import { keyboardRows } from "../../../constants/keyboardRows";

const Keyboard: FC = () => {
  const keyboardWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };

  return (
    <Box sx={keyboardWrapper}>
      {keyboardRows.map((row, index) => (
        <KeyboardRow lettersRow={row} key={index} />
      ))}
    </Box>
  );
};

export default Keyboard;
