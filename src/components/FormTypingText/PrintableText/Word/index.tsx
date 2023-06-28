import React, { FC, ReactNode } from "react";
import { Typography, SxProps } from "@mui/material";

interface WordProps {
  children: ReactNode,
  currentWordIndex: number;
  isError: boolean;
  index: number;
}

const Word: FC<WordProps> = ({ children, currentWordIndex, isError, index }) => {
  const spanPrintedText: SxProps = {
    backgroundColor: "#dfe1ed",
    boxShadow: "0px 0px 2px black",
    padding: "2px 4px",
    margin: "0px 2px",
    lineHeight: "1.8",
    borderRadius: "4px",
  };
  const spanText: SxProps = {
    display: "inline-block",
    padding: "2px 4px",
    margin: "0px 2px",
    lineHeight: "1.8",
    backgroundColor: "white",
  };
  const commonText: SxProps = {
    fontSize: "20px",
  };
  const errorText: SxProps = {
    backgroundColor: "#ffd2d7",
  };

  const wordStyle = (index: number): SxProps =>
    index === currentWordIndex
      ? !isError
        ? spanPrintedText
        : { ...spanPrintedText, ...errorText }
      : spanText;

  return (
        <Typography
          component="span"
          key={index}
          sx={wordStyle(index)}>
            {children}
          </Typography>
  )
};

export default Word;
