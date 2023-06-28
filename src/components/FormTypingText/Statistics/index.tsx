import { Box, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../hooks/redux";

const Statistics = () => {
  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  const { printSpeedLetterPerMinute, printSpeedWordsPerMinute } =
    useAppSelector((state) => state.statatistics);

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h2">Статистика</Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "600px",
          marginTop: "10px",
          borderRadius: "10px",
          backgroundColor: "#00000022",
        }}
      >
        <Typography variant="h4" component="p">
          {printSpeedLetterPerMinute} зн./мин.
        </Typography>

        <Typography variant="h4" component="p">
          {printSpeedWordsPerMinute} слов/мин.
        </Typography>
      </Box>
    </Box>
  );
};

export default Statistics;
