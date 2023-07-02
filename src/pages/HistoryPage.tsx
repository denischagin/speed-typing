import React from "react";
import { useAppSelector } from "../hooks/redux";
import { MenuItem, Typography, Container } from "@mui/material";

const HistoryPage = () => {
  const { history } = useAppSelector((state) => state.statatistics);

  return (
    <Container>
      {history.length === 0 ? (
        <MenuItem>
          <Typography variant="h5">История попыток пустая</Typography>
        </MenuItem>
      ) : (
        history.map((attemp) => (
          <MenuItem key={attemp.id} sx={{
            width: "100px"
          }}>
            <Typography
              sx={{
                wordBreak: "break-all",
              }}
            >
              {attemp.printSpeedLetterPerMinute},{" "}
              {attemp.printSpeedWordsPerMinute}, {attemp.text}
            </Typography>
          </MenuItem>
        ))
      )}
    </Container>
  );
};

export default HistoryPage;
