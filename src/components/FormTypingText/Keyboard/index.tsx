import React, { FC } from "react";
import Key from "./KeyboardRow/Key";
import KeyboardRow from "./KeyboardRow";
import { Box, SxProps } from "@mui/material";

const Keyboard: FC = () => {
  const keyboard_wrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  };
	
	const keyboardRows = [
		["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "Backspace"],
		["Tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "\\"],
		["Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
		["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift"],
		["Ctrl", "Win", "Alt", "Space", "Alt", "Win", "Ctrl"],
]

  return (
    <Box sx={keyboard_wrapper}>
      {keyboardRows.map((row, index) => (
        <KeyboardRow lettersRow={row} key={index} />
      ))}
    </Box>
  );
};

export default Keyboard;
