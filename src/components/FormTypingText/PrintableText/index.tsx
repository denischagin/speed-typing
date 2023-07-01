import { FC } from "react";
import { SxProps, Typography } from "@mui/material";
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
	const commonText: SxProps = {
		fontSize: "20px",
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
