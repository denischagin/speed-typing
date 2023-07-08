import { Typography, SxProps, Box, useTheme } from "@mui/material";
import { FC, memo } from "react";

interface IKeyProps {
  content: string;
  flexGrow: number;
  active: boolean;
  color: string;
}

const Key: FC<IKeyProps> = ({ content, flexGrow, active, color }) => {
  const theme = useTheme();
  const key: SxProps = {
    textAlign: "center",
    padding: "3px",
    margin: "3px",
    borderRadius: "5px",
    border: "1px solid rgba(0, 0, 0, 0.3)",
    width: "100%",
    flexBasis: "100px",
    flexGrow,
    backgroundColor: color,
  };

  const keyActive: SxProps = {
    boxShadow: "inset 0 0 0 100px rgba(0, 0, 0, 0.2)",
  };

  const keyStyles: SxProps = active ? { ...key, ...keyActive } : key;

  return (
    <Box sx={keyStyles}>
      <Typography variant="subtitle1">{content}</Typography>
    </Box>
  );
};

export default memo(
  Key,
  (prevProps, nextProps) => prevProps.active === nextProps.active
);
