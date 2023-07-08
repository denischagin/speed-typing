import React, { useState } from "react";
import { useAppSelector } from "../hooks/redux";
import {
  MenuItem,
  Typography,
  Container,
  Box,
  Pagination,
  IconButton,
  Modal,
  SxProps,
} from "@mui/material";
import HistoryItem from "../components/HistoryList/HistoryItem";
import HistoryList from "../components/HistoryList";

const HistoryPage = () => {
  const { history } = useAppSelector((state) => state.statistics);
  const [pageNumber, setPageNumber] = useState(0);

  const historyReverse = [...history].reverse();

  const countItemsOnPage = 6;

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

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {countPages >= 2 && (
        <Pagination
          sx={{ margin: "10px 0", alignSelf: "center" }}
          count={countPages}
          onChange={handlePaginationChange}
          variant="outlined"
          shape="rounded"
        />
      )}

      <HistoryList 
        historyList={history}
        historyPagination={historyByPagination}
      />
    
    </Container>
  );
};

export default HistoryPage;
