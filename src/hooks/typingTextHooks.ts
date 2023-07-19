import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";
import { setTimer, stopTimer } from "../store/slices/timerSlice";
import { setCurrentSymbol } from "../store/slices/keyboardSlice";
import { setMistakes } from "../store/slices/mistakesSlice";
import { addTypingHistory } from "../store/slices/statisticsSlice";
import { useTypingSpeed } from "../helpers/useTypingSpeed";

export const useListenerNewText = (
  words: string[],
  setValue: (value: string) => void,
  setIsErrorInput: (value: boolean) => void,
  setCurrentWordIndex: (value: number) => void
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (words.length !== 0) {
      setValue("");
      setIsErrorInput(false);
      setCurrentWordIndex(0);
      dispatch(stopTimer());
      dispatch(setTimer(0));
      dispatch(setCurrentSymbol(words[0][0]));
      dispatch(setMistakes(0));
    }
  }, [words]);
};

export const useListenerCurrentWordIndex = (
  words: string[],
  currentWordIndex: number,
  setShowStats: (value: boolean) => void
) => {
  const dispatch = useAppDispatch();
  
  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  const { timer } = useAppSelector((state) => state.timer);
  const { text } = useAppSelector((state) => state.statistics);
  const { printSpeedLetterPerMinute, printSpeedWordsPerMinute } =
    useTypingSpeed(timer, text);

  useEffect(() => {
    if (words.length === 0) return;
    if (words.length === currentWordIndex) {
      dispatch(
        addTypingHistory({
          id: Date.now(),
          printSpeedLetterPerMinute,
          printSpeedWordsPerMinute,
          text,
          mistakes: mistakesCount,
          time: timer,
        })
      );
      dispatch(stopTimer());
      setShowStats(true);
      return;
    }

    dispatch(setCurrentSymbol(words[currentWordIndex][0]));
  }, [currentWordIndex]);
};
