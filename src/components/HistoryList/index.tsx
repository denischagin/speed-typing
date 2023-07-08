import { Box, MenuItem, Typography } from "@mui/material";
import React, { FC } from "react";
import HistoryItem from "./HistoryItem";
import { IHistoryStatistic } from "../../types/IHistoryStatistic";

interface HistoryListProps {
  historyList: IHistoryStatistic[],
  historyPagination: IHistoryStatistic[]
}

const HistoryList: FC<HistoryListProps> = ({historyList, historyPagination}) => {
  return (
    <Box>
      {historyList.length === 0 ? (
        <MenuItem>
          <Typography variant="h5">История попыток пустая</Typography>
        </MenuItem>
      ) : (
        historyPagination.map((attemp) => (
          <HistoryItem attempt={attemp} key={attemp.id} />
        ))
      )}
    </Box>
  );
};

export default HistoryList;
