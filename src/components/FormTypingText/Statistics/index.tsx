import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import keyboardIcon from "../../../assets/keyboard-icon.svg";
import speedIcon from "../../../assets/speed-icon.svg";
import errorIcon from "../../../assets/error-icon.svg";

interface StatisticsProps {
  closeStatistic: () => void;
}

const Statistics: FC<StatisticsProps> = ({ closeStatistic }) => {
  const theme = useTheme();

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

      <Button onClick={closeStatistic}>Продолжить печатать</Button>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          height: "300px",
          marginTop: "10px",
          borderRadius: "10px",
          backgroundColor: theme.palette.primary.light,
        }}
      >
        <Box
          component="img"
          src={speedIcon}
          sx={{
            width: "20%",
          }}
        />

        <Typography
          variant="h4"
          component="p"
          color={theme.palette.text.primary}
        >
          {printSpeedLetterPerMinute} зн./мин.
        </Typography>

        <Typography
          variant="h4"
          component="p"
          color={theme.palette.text.primary}
        >
          {printSpeedWordsPerMinute} слов/мин.
        </Typography>

        <Box
          component="img"
          src={keyboardIcon}
          color="red"
          sx={{
            width: "20%",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexGrow: 1,
          height: "300px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "300px",
            marginTop: "10px",
            width: "50%",
            borderRadius: "10px",
          }}
        >
          <Box
            component="img"
            src={errorIcon}
            sx={{
              width: "200px"
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            height: "300px",
            width: "50%",
            marginTop: "10px",
            borderRadius: "10px",
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Statistics;
