import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import keyboardIcon from "../../../assets/keyboard-icon.svg";
import speedIcon from "../../../assets/speed-icon.svg";
import { convertMillisecondsToTime } from "../../../helpers/convertMillisecondsToTime";
import { useTypingSpeed } from "../../../helpers/useTypingSpeed";
import { addTypingHistory } from "../../../store/slices/statisticsSlice";
import { useCalcFullStats } from "../../../hooks/useCalcFullStats";
import StatItem from "../../HistoryStatItem";
import PieDiagram from "../../PieDiagram";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface StatisticsProps {
  closeStatistic: () => void;
}

const Statistics: FC<StatisticsProps> = ({ closeStatistic }) => {
  const { pastel } = useTheme().palette;
  const statsHistoryStatItemSx = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const dispatch = useAppDispatch();

  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  const { history } = useAppSelector((state) => state.statistics);
  const { timer } = useAppSelector((state) => state.timer);
  const { text } = useAppSelector((state) => state.statistics);

  const { printSpeedLetterPerMinute, printSpeedWordsPerMinute } =
    useTypingSpeed(timer, text);

  const historyWithOutLast = history.slice(0, -1)

  

  const {
    highestPrintSpeedWordsPerMinute,
    highestPrintSpeedLetterPerMinute,
    lowestPrintSpeedLetterPerMinute,
    lowestPrintSpeedWordsPerMinute,
    averagePrintSpeedLetterPerMinute,
    averagePrintSpeedWordsPerMinute,
  } = useCalcFullStats(historyWithOutLast);

  useEffect(() => {
    dispatch(
      addTypingHistory({
        id: Date.now(),
        printSpeedLetterPerMinute,
        printSpeedWordsPerMinute,
        text,
        mistakes: mistakesCount,
        time: timer,
      })
    );
  }, []);

  let accuracy = ((text.length - mistakesCount) / text.length) * 100;

  accuracy = Math.abs(accuracy) >= 100 ? 0 : accuracy;

  const pieData = [
    { name: "Точность", value: parseFloat(accuracy.toFixed(2)) },
    { name: "Процент ошибок", value: parseFloat((100 - accuracy).toFixed(2)) },
  ];

  const barData = [
    {
      name: "Попытки (симв./мин.)",
      current: isFinite(printSpeedLetterPerMinute)
        ? printSpeedLetterPerMinute
        : 0,
      best: isFinite(highestPrintSpeedLetterPerMinute)
        ? highestPrintSpeedLetterPerMinute
        : 0,
      average: isFinite(averagePrintSpeedLetterPerMinute)
        ? averagePrintSpeedLetterPerMinute
        : 0,
      worst: isFinite(lowestPrintSpeedLetterPerMinute)
        ? lowestPrintSpeedLetterPerMinute
        : 0,
    },
    {
      name: "Попытки (слов/мин.)",
      current: isFinite(printSpeedWordsPerMinute)
        ? printSpeedWordsPerMinute
        : 0,
      best: isFinite(highestPrintSpeedWordsPerMinute)
        ? highestPrintSpeedWordsPerMinute
        : 0,
      average: isFinite(averagePrintSpeedWordsPerMinute)
        ? averagePrintSpeedWordsPerMinute
        : 0,
      worst: isFinite(lowestPrintSpeedWordsPerMinute)
        ? lowestPrintSpeedWordsPerMinute
        : 0,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5">Попытка № {historyWithOutLast.length + 1}</Typography>
        <Button onClick={closeStatistic} variant="outlined">
          Новый текст
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StatItem
            title="Скорость печати (сим. в минуту)"
            value={printSpeedLetterPerMinute}
            type="worst"
          />
          <StatItem
            title="Потрачено времени:"
            value={convertMillisecondsToTime(timer)}
            type="average"
          />
        </Grid>

        <Grid item xs={6}>
          <StatItem
            title="Скорость печати (слов в минуту)"
            value={printSpeedWordsPerMinute}
            type="worst"
          />

          <StatItem
            title="Количество ошибок"
            value={mistakesCount}
            type="errors"
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          mt: "80px",
        }}
      >
        <Grid item xs={12} md={6} sx={statsHistoryStatItemSx}>
          <Typography variant="subtitle1">Сравнение попыток</Typography>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={730}
              height={250}
              data={barData}
              style={{ fontSize: "17px", fontFamily: "Roboto" }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar name="худшая попытка" dataKey="worst" fill="#82ca9daa" />
              <Bar name="среднее" dataKey="average" fill="#82ca9ddd" />
              <Bar name="текущая попытка" dataKey="current" fill="#8884d8" />
              <Bar name="лучшая попытка" dataKey="best" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>

        <Grid item xs={12} md={6} sx={statsHistoryStatItemSx}>
          <Typography variant="subtitle1">Точность</Typography>

          <PieDiagram data={pieData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
