import React, { FC, ReactNode } from "react";
import { Typography, SxProps } from "@mui/material";

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
  const spanPrintedText: SxProps = {
    backgroundColor: "#dfe1ed",
    boxShadow: "0px 0px 2px black",
  };
  const spanText: SxProps = {
    display: "inline-block",
    padding: "2px 4px",
    boxShadow: "0px 0px 2px transparent",
    margin: "0px 2px",
    lineHeight: "1.4",
    backgroundColor: "white",
    borderRadius: "4px",
  };
  const errorText: SxProps = {
    backgroundColor: "#ffd2d7",
  };

  const wordStyle: SxProps =
    index === currentWordIndex
      ? !isError
        ? { ...spanText, ...spanPrintedText }
        : { ...spanText, ...spanPrintedText, ...errorText }
      : spanText;

  return (
    <Typography component="span" key={index} sx={wordStyle}>
      {children}
    </Typography>
  );
};

export default Word;
