import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { HistoryStatItemType } from "../../types/HistoryStatItemType";

interface HistoryStatItemProps {
  title: string;
  value: string | number;
  type?: HistoryStatItemType;
}

const HistoryStatItem: FC<HistoryStatItemProps> = ({
  title,
  value,
  type = "default",
}) => {
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

  let bgcolor: string = "#AFDAFC99";

  switch (type) {
    case "errors":
      bgcolor = "#FFB6C199"
      break;
    case "average":
      bgcolor = "#AED8E6aa"
      break;
    case "best":
      bgcolor = "#a2d9afaa"
      break;
    case "worst":
      bgcolor = "#9dc3e6aa"
      break;
  }


  if (Number.isNaN(value) || !Number.isFinite(value)) value = 0;

  return (
    <Box sx={{...historyStatItemStyles, bgcolor}}>
      <Typography variant="h6">{title}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default HistoryStatItem;
