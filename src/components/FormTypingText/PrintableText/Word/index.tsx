import React, {
  FC,
  ReactNode,
  memo,
  forwardRef,
  useRef,
  PropsWithChildren,
  Ref,
  ForwardRefRenderFunction,
} from "react";
import { Typography, SxProps, useTheme } from "@mui/material";
import { WordType } from "../../../../types/WordType";
import { useAppSelector } from "../../../../hooks/redux";

interface WordProps {
  text: string;
  index: number;
  type?: WordType;
}

const Word = forwardRef<HTMLParagraphElement, WordProps>(
  (
    { text, index, type = "default" }: WordProps,
    ref: Ref<HTMLParagraphElement>
  ) => {
    const theme = useTheme();

    const { fontWeight, fontFamily, fontSize } = useAppSelector(
      (state) => state.settings
    );

    const spanText: SxProps = {
      // settings
      fontWeight,
      fontFamily,
      fontSize,

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
      <Typography component="span" key={index} sx={wordSx} ref={ref}>
        {text}
      </Typography>
    );
  }
);

export default memo(
  Word,
  (prevProps, nextProps) =>
    prevProps.text === nextProps.text && prevProps.type === nextProps.type
);
