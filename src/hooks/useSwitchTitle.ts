import { useEffect, useMemo } from "react";
import { TitleEnum } from "../types/TitleEnum";
import { useAppSelector } from "./redux";

export const useSwitchTitle = () => {
  const customEqual = (oldValue: any, newValue: any) =>
    oldValue.timerIsStarted === newValue.timerIsStarted;

  const { timerIsStarted } = useAppSelector(
    (state) => state.timer,
    customEqual
  );

  const timerIsStartedMemo = useMemo(() => {
    return timerIsStarted;
  }, [timerIsStarted]);

  useEffect(() => {
    !timerIsStarted
      ? (document.title = TitleEnum.DEFAULT)
      : (document.title = TitleEnum.TIME_GOES);
    return () => {
      document.title = TitleEnum.DEFAULT;
    };
  }, [timerIsStarted]);
};
