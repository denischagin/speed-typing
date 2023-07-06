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
import HistoryItem from "../components/history/HistoryItem";

const HistoryPage = () => {
  const modalContent: SxProps = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const { history } = useAppSelector((state) => state.statatistics);
  const [pageNumber, setPageNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const historyReverse = [...history].reverse();

  const countItemsOnPage = 6;

  const pagesVisited = pageNumber * countItemsOnPage;
  const countPages = Math.ceil(historyReverse.length / countItemsOnPage);

  const historyByPagination = historyReverse.slice(
    pagesVisited,
    pagesVisited + countItemsOnPage
  );

  console.log(historyByPagination)

  const handlePaginationChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPageNumber(page - 1);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Container>
      {countPages >= 2 && (
        <Pagination
          sx={{ margin: "10px 0" }}
          count={countPages}
          onChange={handlePaginationChange}
        />
      )}
      <Box>
        {historyReverse.length === 0 ? (
          <MenuItem>
            <Typography variant="h5">История попыток пустая</Typography>
          </MenuItem>
        ) : (
          historyByPagination.map((attemp) => (
            <HistoryItem attempt={attemp} key={attemp.id} />
          ))
        )}
      </Box>
    </Container>
  );
};

export default HistoryPage;
