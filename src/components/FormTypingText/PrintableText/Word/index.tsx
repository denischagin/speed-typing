import React, { FC, ReactNode, memo } from "react";
import { Typography, SxProps, useTheme } from "@mui/material";
import { WordType } from "../../../../types/WordTypeEnum";

interface WordProps {
  children: ReactNode;
  index: number;
  type?: WordType;
}

const Word: FC<WordProps> = ({ children, index, type = "default" }) => {
  const theme = useTheme();

  const spanText: SxProps = {
    display: "inline-block",
    padding: "2px 4px",
    boxShadow: "0px 0px 2px transparent",
    margin: "0px 2px",
    lineHeight: "1.4",
    borderRadius: "4px",
    wordBreak: "break-all",
  };
  const activeText: SxProps = {
    ...spanText,
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0px 0px 2px black",
  };
  const errorText: SxProps = {
    ...spanText,
    backgroundColor: theme.palette.error.light,
  };
  const printedText: SxProps = {
    ...spanText,
    color: theme.palette.grey[400],
  };

  const getSxByWordType = (type: WordType): SxProps => {
    switch (type) {
      case "active":
        return activeText;
      case "error":
        return errorText;
      case "printed":
        return printedText;
      default:
        return spanText;
    }
  };

  const wordSx = getSxByWordType(type);

  return (
    <Typography component="span" key={index} sx={wordSx}>
      {children}
    </Typography>
  );
};

export default memo(
  Word,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.type === nextProps.type
);
