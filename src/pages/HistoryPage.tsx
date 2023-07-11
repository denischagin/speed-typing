import React, { useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { Typography, Container, Box, Pagination, Grid } from "@mui/material";
import HistoryList from "../components/HistoryList";
import { useCalcFullStats } from "../hooks/useCalcFullStats";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatItem from "../components/HistoryStatItem";
import PieDiagram from "../components/PieDiagram";

const HistoryPage = () => {
  const statsHistoryStatItemSx = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const { history } = useAppSelector((state) => state.statistics);
  const [pageNumber, setPageNumber] = useState(0);
  const {
    accuracy,
    averagePrintSpeedLetterPerMinute,
    averagePrintSpeedWordsPerMinute,
    countAttempts,
    highestPrintSpeedLetterPerMinute,
    highestPrintSpeedWordsPerMinute,
    lowestPrintSpeedLetterPerMinute,
    lowestPrintSpeedWordsPerMinute,
    totalMistakes,
  } = useCalcFullStats(history);

  const historyReverse = [...history].reverse();

  const countItemsOnPage = 4;

  const pagesVisited = pageNumber * countItemsOnPage;
  const countPages = Math.ceil(historyReverse.length / countItemsOnPage);

  const historyByPagination = historyReverse.slice(
    pagesVisited,
    pagesVisited + countItemsOnPage
  );

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page - 1);
  };

  const pieData = [
    {
      name: "Точность",
      value: parseFloat(accuracy.toFixed(2)),
    },
    {
      name: "Количество ошибок",
      value: parseFloat((100 - accuracy).toFixed(2)),
    },
  ];

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
      }}
    >
      <Grid
        container
        display="flex"
        justifyContent="center"
        spacing={2}
        direction="row"
      >
        <Grid item xs={6}>
          <StatItem title="Количество попыток:" value={countAttempts} />
          <StatItem
            type="best"
            title="Наивысшая скорость печати (букв в минуту):"
            value={highestPrintSpeedLetterPerMinute}
          />
          <StatItem
            type="average"
            title="Средняя скорость печати (букв в минуту):"
            value={averagePrintSpeedLetterPerMinute}
          />
          <StatItem
            type="worst"
            title="Наименьшая скорость печати (букв в минуту):"
            value={lowestPrintSpeedLetterPerMinute}
          />
        </Grid>

        <Grid item xs={6}>
          <StatItem
            type="errors"
            title="Общее количество ошибок:"
            value={totalMistakes}
          />
          <StatItem
            type="best"
            title="Наивысшая скорость печати (слов в минуту):"
            value={highestPrintSpeedWordsPerMinute}
          />
          <StatItem
            type="average"
            title="Средняя скорость печати (слов в минуту):"
            value={averagePrintSpeedWordsPerMinute}
          />
          <StatItem
            type="worst"
            title="Наименьшая скорость печати (слов в минуту):"
            value={lowestPrintSpeedWordsPerMinute}
          />
        </Grid>
      </Grid>

      <Box>
        <Typography
          variant="h6"
          sx={{
            mb: "5px",
          }}
        >
          Все попытки:
        </Typography>

        <HistoryList
          historyList={history}
          historyPagination={historyByPagination}
        />
        <Pagination
          sx={{ margin: "10px 0", alignSelf: "center" }}
          count={countPages}
          onChange={handlePaginationChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>

      <Box width="100%" height="500px">
        <Typography variant="h6">Остальная статистика:</Typography>

        <Grid container>
          <Grid item xs={12} md={6} sx={statsHistoryStatItemSx}>
            <Typography variant="subtitle1">Все попытки</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                width={1000}
                height={250}
                data={history}
                style={{ fontSize: "18px", fontFamily: "Roboto" }}
                margin={{ top: 40, right: 30, left: 0, bottom: 40 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="index" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="printSpeedLetterPerMinute"
                  name="скорость печати - символы в минуту"
                  stroke="#8884d8"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="printSpeedWordsPerMinute"
                  name="скорость печати - слова в минуту"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Grid>

          <Grid item xs={12} md={6} sx={statsHistoryStatItemSx}>
            <Typography variant="subtitle1">Точность</Typography>

            <PieDiagram data={pieData} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default HistoryPage;
