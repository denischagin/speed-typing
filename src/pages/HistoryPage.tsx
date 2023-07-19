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
import AreaDiagram, { AreaItem } from "../components/AreaDiagram";
import { usePagination } from "../hooks/usePagination";

const HistoryPage = () => {
  const statsHistoryStatItemSx = {
    height: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const { history } = useAppSelector((state) => state.statistics);

  const historyReverse = [...history].reverse();

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

  const { countPages, dataWithPagination, pageNumber, setPageNumber } =
    usePagination(historyReverse, 4);

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

  const areaList: AreaItem[] = [
    {
      dataKey: "printSpeedLetterPerMinute",
      name: "скорость печати - символы в минуту",
      stroke: "#8884d8",
      fill: "url(#colorUv)",
    },
    {
      dataKey: "printSpeedWordsPerMinute",
      name: "скорость печати - слова в минуту",
      stroke: "#82ca9d",
      fill: "url(#colorPv)",
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
          historyPagination={dataWithPagination}
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
            <AreaDiagram data={history} areaList={areaList} />
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
