import { FC } from "react";
import KeyboardRow from "./KeyboardRow";
import { Box, SxProps } from "@mui/material";
import { keyboardRows } from "../../../constants/keyboardRows";
import ColorPanel from "./ColorPanel";

const Keyboard: FC<{ currentSymbol: string }> = ({ currentSymbol }) => {
  const keyboardWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };


  return (
    <Box sx={keyboardWrapper}>
      {keyboardRows.map((row, index) => (
        <KeyboardRow
          currentSymbol={currentSymbol}
          lettersRow={row}
          key={index}
        />
      ))}

      <ColorPanel />
    </Box>
  );
};

export default Keyboard;
