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
import BarDiagram, { BarItem } from "../../BarDiagram";

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

  const { history } = useAppSelector((state) => state.statistics);

  const {
    mistakes,
    printSpeedLetterPerMinute,
    printSpeedWordsPerMinute,
    text,
    time,
  } = history[history.length - 1];

  const historyWithOutLast = history.slice(0, -1);

  const {
    highestPrintSpeedWordsPerMinute,
    highestPrintSpeedLetterPerMinute,
    lowestPrintSpeedLetterPerMinute,
    lowestPrintSpeedWordsPerMinute,
    averagePrintSpeedLetterPerMinute,
    averagePrintSpeedWordsPerMinute,
  } = useCalcFullStats(historyWithOutLast);

  let accuracy = ((text.length - mistakes) / text.length) * 100;

  accuracy = Math.abs(accuracy) >= 100 ? 0 : accuracy;

  const pieData = [
    { name: "Точность", value: parseFloat(accuracy.toFixed(2)) },
    { name: "Процент ошибок", value: parseFloat((100 - accuracy).toFixed(2)) },
  ];

  const barData = [
    {
      name: "Попытки (симв./мин.)",
      current: printSpeedLetterPerMinute,
      best: highestPrintSpeedLetterPerMinute,
      average: averagePrintSpeedLetterPerMinute,
      worst: lowestPrintSpeedLetterPerMinute,
    },
    {
      name: "Попытки (слов/мин.)",
      current: printSpeedWordsPerMinute,
      best: highestPrintSpeedWordsPerMinute,
      average: averagePrintSpeedWordsPerMinute,
      worst: lowestPrintSpeedWordsPerMinute,
    },
  ];

  const barList: BarItem[] = [
    { name: "худшая попытка", dataKey: "worst", fill: "#82ca9daa" },
    { name: "среднее", dataKey: "average", fill: "#82ca9ddd" },
    { name: "текущая попытка", dataKey: "current", fill: "#8884d8" },
    { name: "лучшая попытка", dataKey: "best", fill: "#82ca9d" },
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
        <Typography variant="h5">
          Попытка № {historyWithOutLast.length + 1}
        </Typography>
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
            value={convertMillisecondsToTime(time)}
            type="average"
          />
        </Grid>

        <Grid item xs={6}>
          <StatItem
            title="Скорость печати (слов в минуту)"
            value={printSpeedWordsPerMinute}
            type="worst"
          />

          <StatItem title="Количество ошибок" value={mistakes} type="errors" />
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
          <BarDiagram data={barData} barList={barList} />
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
