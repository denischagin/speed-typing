import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { useAppSelector } from "../../../hooks/redux";
import keyboardIcon from "../../../assets/keyboard-icon.svg";
import speedIcon from "../../../assets/speed-icon.svg";
import { convertMillisecondsToTime } from "../../../helpers/convertMillisecondsToTime";
import { useTypingSpeed } from "../../../hooks/useTypingSpeed";

interface StatisticsProps {
  closeStatistic: () => void;
}

const Statistics: FC<StatisticsProps> = ({ closeStatistic }) => {
  const theme = useTheme();

  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  const { timer } = useAppSelector((state) => state.timer);

  const { text } = useAppSelector((state) => state.statatistics);

  const { printSpeedLetterPerMinute, printSpeedWordsPerMinute } =
    useTypingSpeed(timer, text);
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h2">Статистика</Typography>

      <Button onClick={closeStatistic}>
        Начать печатать новый рандомный текст
      </Button>

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
            width: "150px",
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
            width: "150px",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "300px",
          gap: "10px",
          marginTop: "10px",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "300px",
            marginTop: "10px",
            width: "50%",
            borderRadius: "10px",
            backgroundColor: theme.palette.error.light,
          }}
        >
          <Typography
            variant="h4"
            component="p"
            color={theme.palette.text.primary}
          >
            Ошибки: {mistakesCount}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexGrow: 1,
            height: "300px",
            width: "50%",
            marginTop: "10px",
            borderRadius: "10px",
            backgroundColor: theme.palette.success.light,
          }}
        >
          <Typography
            variant="h4"
            component="p"
            color={theme.palette.text.primary}
          >
            Время: {convertMillisecondsToTime(timer)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Statistics;
