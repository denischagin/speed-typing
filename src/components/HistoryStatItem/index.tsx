import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

interface HistoryStatItemProps {
  title: string;
  value: string | number;
}

const HistoryStatItem: FC<HistoryStatItemProps> = ({ title, value }) => {
  const historyStatItemStyles = {
    bgcolor: "#AFDAFC99",
    borderRadius: 4,
    marginTop: "20px",
    width: "100%",
    padding: "16px",
    "& + &": {
      marginTop: "10px",
    },
  };

  if (Number.isNaN(value) || !Number.isFinite(value)) value = 0;

  return (
    <Box sx={historyStatItemStyles}>
      <Typography variant="h6">{title}</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

export default HistoryStatItem;
