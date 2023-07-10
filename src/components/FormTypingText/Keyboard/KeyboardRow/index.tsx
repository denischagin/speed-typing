import { SxProps, useTheme } from "@mui/material";
import { FC } from "react";
import Key from "../Key/index";
import { Box } from "@mui/material";
import { IKey } from "../../../../types/IKey";
import { blue, green, grey, purple, red, yellow } from "@mui/material/colors";

interface IKeyboardRowProps {
  lettersRow: IKey[];
  currentSymbol: string;
}

const KeyboardRow: FC<IKeyboardRowProps> = ({ lettersRow, currentSymbol }) => {
  const row: SxProps = {
    display: "flex",
    justifyContent: "space-between",
  };

  const theme = useTheme();

  const colorFinger = theme.fingers

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

  function assignFingerColors(key: string): string {
    key = key.toLocaleLowerCase();

    const fingerMapping: { [key: string]: string[] } = {
      thumb: ["space", 'alt', 'win' ],
      indexLeft: ["к", "а", "м", "е", "п", "и", "4", "5"],
      indexRight: ["г", "о", "ь", "н", "р", "т", "6", "7"],
      middle: ["у", "в", "с", "ш", "л", "б", "8", "3"],
      ring: ["ц", "ы", "ч", "щ", "д", "ю", "9", "2"],
      pinky: [
        "й",
        "ф",
        "я",
        "з",
        "ж",
        ".",
        "х",
        "ъ",
        "\\",
        "backspace",
        "ё",
        "э",
        "1",
        "0",
        "-",
        "=",
        "tab",
        "caps",
        'shift',
        'ctrl',
        'enter'
      ],
    };

    const finger = Object.keys(fingerMapping).find((finger: string) =>
      fingerMapping[finger].includes(key)
    );

    switch (finger) {
      case "thumb":
        return colorFinger.thumb;
      case "indexLeft":
        return colorFinger.leftIndex;
      case "indexRight":
        return colorFinger.rightIndex;
      case "middle":
        return colorFinger.middle;
      case "ring":
        return colorFinger.ring;
      case "pinky":
        return colorFinger.pinky;
      default:
        return colorFinger.default;
    }
  }

  return (
    <Box sx={row}>
      {lettersRow.map(({ id, key }, index) => (
        <Key
          active={symbolAndCtrl(currentSymbol).includes(key)}
          content={key}
          key={id}
          flexGrow={id === "key-space" ? 50 : 0}
          color={assignFingerColors(key)}
        />
      ))}
    </Box>
  );
};

export default KeyboardRow;
