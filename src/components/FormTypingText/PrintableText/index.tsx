import React, { FC, Fragment } from "react";
import { makeStyles, SxProps, Typography } from "@mui/material";
import Word from "./Word";

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
	// styles
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

  return (
    <Typography variant="body1" sx={commonText}>
      {words.map((word, index) =>
        <Word 
					key={index}
					currentWordIndex={currentWordIndex} 
					index={index}
					isError={isError}
				>
					{word}
				</Word>
			)}
    </Typography>
  );
};

export default PrintableText;
