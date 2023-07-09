import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import keyboardIcon from "../../../assets/keyboard-icon.svg";
import speedIcon from "../../../assets/speed-icon.svg";
import { convertMillisecondsToTime } from "../../../helpers/convertMillisecondsToTime";
import { useTypingSpeed } from "../../../hooks/useTypingSpeed";
import { addTypingHistory } from "../../../store/slices/statisticsSlice";

interface StatisticsProps {
  closeStatistic: () => void;
}

const Statistics: FC<StatisticsProps> = ({ closeStatistic }) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  const { timer } = useAppSelector((state) => state.timer);
  const { text } = useAppSelector((state) => state.statistics);

  const { printSpeedLetterPerMinute, printSpeedWordsPerMinute } = useTypingSpeed(
    timer,
    text
  );

  useEffect(() => {
    dispatch(
      addTypingHistory({
        id: Date.now(),
        printSpeedLetterPerMinute,
        printSpeedWordsPerMinute,
        text,
        mistakes: mistakesCount,
        time: timer
      })
    );
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h2">Статистика</Typography>
        <Button onClick={closeStatistic} variant="outlined">
          Новый текст
        </Button>
      </Box>

      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        justifyContent="space-evenly"
        height={300}
        marginTop={2}
        borderRadius={10}
        bgcolor={theme.palette.primary.light}
        p={2}
      >
        <Box
          component="img"
          src={speedIcon}
          sx={{
            width: "150px",
          }}
        />

        <Typography variant="h4" component="p" color="text.primary">
          {printSpeedLetterPerMinute} зн./мин.
        </Typography>

        <Typography variant="h4" component="p" color="text.primary">
          {printSpeedWordsPerMinute} слов/мин.
        </Typography>

        <Box
          component="img"
          src={keyboardIcon}
          sx={{
            width: "150px",
          }}
        />
      </Box>

      <Box display="flex" mt={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          height={300}
          mr={1}
          borderRadius={10}
          bgcolor={theme.palette.error.light}
          p={2}
        >
          <Typography variant="h4" component="p" color="text.primary">
            Ошибки: {mistakesCount}
          </Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexGrow={1}
          height={300}
          ml={1}
          borderRadius={10}
          bgcolor={theme.palette.success.light}
          p={2}
        >
          <Typography variant="h4" component="p" color="text.primary">
            Время: {convertMillisecondsToTime(timer)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Statistics;
