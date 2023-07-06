import { makeStyles, SxProps } from "@mui/material";
import { FC } from "react";
import Key from "../Key/index";
import { useAppSelector } from "../../../../hooks/redux";
import { Box } from "@mui/material";

interface IKeyboardRowProps {
  lettersRow: string[];
}

const KeyboardRow: FC<IKeyboardRowProps> = ({ lettersRow }) => {
  const row: SxProps = {
    display: "flex",
    justifyContent: "space-between",
  };

  const state = useAppSelector((state) => state.keyboard);

  const symbolAndCtrl = (symbol: string) => {
    switch (symbol) {
      case "!":
        return ["Shift", "1"];
      case '"':
        return ["Shift", "2"];
      case ";":
        return ["Shift", "4"];
      case "%":
        return ["Shift", "5"];
      case ":":
        return ["Shift", "6"];
      case "?":
        return ["Shift", "7"];
      case "*":
        return ["Shift", "8"];
      case "(":
        return ["Shift", "9"];
      case ")":
        return ["Shift", "0"];
      case "-":
        return ["-"];
      case ",":
        return ["Shift", "."];
      case symbol.toUpperCase():
        return ["Shift", symbol.toLowerCase()];

      default:
        return [symbol];
    }
  };

  return (
    <Box sx={row}>
      {lettersRow.map((letter, index) => (
        <Key
          active={symbolAndCtrl(state.currentSymbol).includes(letter)}
          content={letter}
          key={index + Date.now()}
          flexGrow={letter === "Space" ? 50 : 0}
        />
      ))}
    </Box>
  );
};

export default KeyboardRow;
