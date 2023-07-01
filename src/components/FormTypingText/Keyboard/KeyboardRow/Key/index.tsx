import {
  Typography,
  SxProps,
  Box,
  useTheme,
} from "@mui/material";
import { FC } from "react";

interface IKeyProps {
  content: string;
  flexGrow: number;
  active: boolean;
}

const Key: FC<IKeyProps> = ({ content, flexGrow, active }) => {
  const theme = useTheme()
  const key: SxProps = {
    textAlign: "center",
    padding: "3px",
    margin: "3px",
    borderRadius: "5px",
    border: "1px solid black",
    width: "100%",
    flexBasis: "100px",
    flexGrow: flexGrow,
  };

  const keyActive: SxProps = {
    background: theme.palette.primary.light
  };

  const keyStyles: SxProps = active ? { ...key, ...keyActive } : key;

  return (
    <Box sx={keyStyles}>
      <Typography variant="subtitle1">{content}</Typography>
    </Box>
  );
};

export default Key;