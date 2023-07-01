import { Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../hooks/redux";
import { useAppDispatch } from "./../../../hooks/redux";
import { convertMillisecondsToTime } from "../../../helpers/convertMillisecondsToTime";
import { tick } from "../../../store/slices/timerSlice";

const Timer = () => {
  const timerRef = useRef(0);

  const { timerIsStarted, timer } = useAppSelector((state) => state.timer);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (timerIsStarted) startTimer();
    else stopTimer();
  }, [timerIsStarted]);

  const startTimer = () => {
    clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      dispatch(tick());
    }, 10);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current)
  };

  return (
    <div>
      <Typography variant="subtitle1">
        Время: {convertMillisecondsToTime(timer)}
      </Typography>
    </div>
  );
};

export default Timer;
