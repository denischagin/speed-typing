import { FC, useEffect, useRef } from "react";
import { Box, SxProps, Typography, useTheme } from "@mui/material";
import Word from "./Word";
import { WordType } from "../../../types/WordType";

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
    height: "100%",
    width: "100%",
    borderRadius: "4px",
    overflowY: "scroll",
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.light,
    },
    "&::-webkit-scrollbar": {
      width: "13px",
      backgroundColor: theme.palette.background.paper,
    },
  };

  const activeWordRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current || !activeWordRef.current) return;

    containerRef.current.scrollTo({
      top:
        activeWordRef.current.offsetTop -
        containerRef.current.offsetTop,
      behavior: "smooth",
    });
  }, [currentWordIndex]);

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
    <Box
      sx={{
        height: "400px",
        width: "100%",
        p: "3px 3px",
        border: "2px solid " + theme.palette.divider,
      }}
    >
      <Typography variant="body1" sx={commonText} ref={containerRef}>
        {words.map((word, wordIndex) => (
          <Word
            ref={wordIndex === currentWordIndex ? activeWordRef : undefined}
            key={wordIndex}
            index={wordIndex}
            type={getWordType(wordIndex, currentWordIndex, isError)}
            text={word}
          />
        ))}
      </Typography>
    </Box>
  );
};

export default PrintableText;
