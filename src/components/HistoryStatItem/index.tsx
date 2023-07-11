import { Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { HistoryStatItemType } from "../../types/HistoryStatItemType";

interface HistoryStatItemProps {
  title: string;
  value: string | number;
  type?: HistoryStatItemType;
}

const StatItem: FC<HistoryStatItemProps> = ({
  title,
  value,
  type = "default",
}) => {
  const { pastel } = useTheme().palette;
  const historyStatItemStyles = {
    bgcolor: "",
    borderRadius: 4,
    marginTop: "20px",
    width: "100%",
    padding: "16px",
    "& + &": {
      marginTop: "10px",
    },
  };

  let bgcolor: string = pastel.blue.light;

  switch (type) {
    case "errors":
      bgcolor = pastel.red;
      break;
    case "average":
      bgcolor = pastel.blue.normal;
      break;
    case "best":
      bgcolor = pastel.green;
      break;
    case "worst":
      bgcolor = pastel.blue.dark;
      break;
  }

  if (
    Number.isNaN(value) ||
    (!Number.isFinite(value) && typeof value !== "string")
  )
    value = 0;

  return (
    <Box sx={{ ...historyStatItemStyles, bgcolor }}>
      <Typography variant="h6">{title}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default StatItem;
