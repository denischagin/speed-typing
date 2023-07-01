import React, { FC, ReactNode, memo } from "react";
import { Typography, SxProps, useTheme } from "@mui/material";

interface WordProps {
  children: ReactNode;
  currentWordIndex: number;
  isError: boolean;
  index: number;
}

const Word: FC<WordProps> = ({
  children,
  currentWordIndex,
  isError,
  index,
}) => {
  const theme = useTheme();

  const spanPrintedText: SxProps = {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0px 0px 2px black",
  };
  const spanText: SxProps = {
    display: "inline-block",
    padding: "2px 4px",
    boxShadow: "0px 0px 2px transparent",
    margin: "0px 2px",
    lineHeight: "1.4",
    borderRadius: "4px",
  };
  const errorText: SxProps = {
    backgroundColor: theme.palette.error.light,
  };

  const wordStyle: SxProps =
    index === currentWordIndex
      ? !isError
        ? { ...spanText, ...spanPrintedText }
        : { ...spanText, ...spanPrintedText, ...errorText }
      : spanText;

  return (
    <Typography
      component="span"
      color={currentWordIndex > index ? theme.palette.grey[400] : undefined}
      key={index}
      sx={wordStyle}
    >
      {children}
    </Typography>
  );
};

export default Word

// export default memo(Word, (prevProps, nextProps) => {
//   return (
//     (prevProps.isError === nextProps.isError &&
//       prevProps.currentWordIndex === nextProps.currentWordIndex) ||
//     (nextProps.currentWordIndex !== prevProps.index &&
//       nextProps.currentWordIndex - 1 !== prevProps.index)
//   );
// });
