import { Box, MenuItem, Typography } from "@mui/material";
import React, { FC } from "react";
import HistoryItem from "./HistoryItem";
import { IHistoryStatistic } from "../../types/IHistoryStatistic";

interface HistoryListProps {
  historyList: IHistoryStatistic[];
  historyPagination: IHistoryStatistic[];
}

const HistoryList: FC<HistoryListProps> = ({
  historyList,
  historyPagination,
}) => {
  return (
    <Box height="294px">
      {historyList.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="264px"
        >
          <Typography variant="h4">История попыток пустая</Typography>
        </Box>
      ) : (
        historyPagination.map((attemp) => (
          <HistoryItem attempt={attemp} key={attemp.id} />
        ))
      )}
    </Box>
  );
};

export default HistoryList;
