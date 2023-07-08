import { FC } from "react";
import { SxProps, Typography, useTheme } from "@mui/material";
import Word from "./Word";
import { WordType } from "../../../types/WordTypeEnum";

interface IPrintableTextProps {
  words: string[];
  currentWordIndex: number;
  isError: boolean;
}

const PrintableText: FC<IPrintableTextProps> = ({
  words,
  currentWordIndex,
  isError,
}) => {
  const theme = useTheme();
  // styles
  const commonText: SxProps = {
    fontSize: "20px",
  };

  const getWordType = (
    wordIndex: number,
    currentWordIndex: number,
    isError: boolean
  ): WordType | undefined => {
    if (wordIndex === currentWordIndex && !isError) return "active";

    if (wordIndex === currentWordIndex && isError) return "error";

    if (currentWordIndex > wordIndex) return "printed";
  };

  return (
    <Typography variant="body1" sx={commonText}>
      {words.map((word, wordIndex) => (
        <Word
          key={wordIndex}
          index={wordIndex}
          type={getWordType(wordIndex, currentWordIndex, isError)}
        >
          {word}
        </Word>
      ))}
    </Typography>
  );
};

export default PrintableText;
