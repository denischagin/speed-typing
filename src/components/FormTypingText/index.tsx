import { useState, useRef, FC } from "react";
import PrintableText from "./PrintableText/index";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { startTimer } from "../../store/slices/timerSlice";
import Statistics from "./Statistics";
import { setCurrentSymbol } from "../../store/slices/keyboardSlice";
import {
  incrementMistakes,
} from "../../store/slices/mistakesSlice";
import { Box, SxProps, TextField, Button, LinearProgress } from "@mui/material";
import Keyboard from "./Keyboard";
import { fetchText } from "../../store/asyncActions/fetchText";
import StatsSection from "../StatsSection";
import Timer from "./Timer";
import {
  useListenerCurrentWordIndex,
  useListenerNewText,
} from "../../hooks/typingTextHooks";
import { useSwitchTitle } from "../../hooks/useSwitchTitle";

interface IFormTypingTextProps {
  words: string[];
}

const FormTypingText: FC<IFormTypingTextProps> = ({ words }) => {
  // styles
  const formTypingTextWrapper: SxProps = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    gap: "20px",
    marginTop: "20px",
  };
  const inputWord: SxProps = {
    maxWidth: "400px",
    width: "100%",
  };

  const dispatch = useAppDispatch();
  const textFieldInputRef = useRef<HTMLInputElement>(null);

  const [showStats, setShowStats] = useState(false);
  const [value, setValue] = useState("");
  const [isErrorInput, setIsErrorInput] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const { currentSymbol } = useAppSelector((state) => state.keyboard);
  const { isLoading, textNumber, textType } = useAppSelector(
    (state) => state.statistics
  );

  useListenerNewText(words, setValue, setIsErrorInput, setCurrentWordIndex);
  useListenerCurrentWordIndex(words, currentWordIndex, setShowStats);
  useSwitchTitle();

  const customEqual = (oldValue: any, newValue: any) =>
    oldValue.timerIsStarted === newValue.timerIsStarted;

  const { timerIsStarted } = useAppSelector(
    (state) => state.timer,
    customEqual
  );

  const onStartTyping = (value: string) => {
    if (!timerIsStarted && value.length >= 1) dispatch(startTimer());
  };

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setValue(currentValue);
    onStartTyping(currentValue);

    const lastSymbol = currentValue[currentValue.length - 1];
    const wordInValue = currentValue.substring(0, currentValue.length - 1);

    if (
      // Слово начинается на значение в Input
      words[currentWordIndex].startsWith(currentValue) ||
      // Последний символ пробел и слово без пробела в конце равно значению из Input
      (lastSymbol === " " && words[currentWordIndex] === wordInValue)
    ) {
      handlePrintSuccess(currentValue);
    } else {
      handlePrintError();
    }
  };

  const handlePrintError = () => {
    dispatch(setCurrentSymbol("Backspace"));
    !isErrorInput && dispatch(incrementMistakes());
    setIsErrorInput(true);
  };

  const handlePrintSuccess = (currentValue: string) => {
    const lastSymbol = currentValue[currentValue.length - 1];

    setIsErrorInput(false);

    if (lastSymbol === " ") {
      setCurrentWordIndex((prev) => (prev += 1));
      setValue("");
    }

    const currentSymbol: string | undefined =
      words[currentWordIndex][currentValue.length];

    if (currentSymbol === undefined) return dispatch(setCurrentSymbol("Space"));

    dispatch(setCurrentSymbol(currentSymbol));
  };

  return (
    <Box sx={formTypingTextWrapper}>
      {!showStats ? (
        <>
          <Box display="flex" justifyContent="space-between" width="100%">
            <StatsSection />
            <Timer />
          </Box>

          {!isLoading ? (
            <PrintableText
              currentWordIndex={currentWordIndex}
              words={words}
              isError={isErrorInput}
            />
          ) : (
            <Box height="400px" width="100%">
              <LinearProgress variant="indeterminate" sx={{ width: "100%" }} />
            </Box>
          )}

          <TextField
            inputRef={textFieldInputRef}
            label="Введите текст..."
            sx={inputWord}
            variant="outlined"
            type="text"
            error={isErrorInput}
            value={value}
            onChange={handlerInputChange}
          />

          <Button
            onClick={() => setKeyboardActive((prev) => !prev)}
            variant="outlined"
          >
            {keyboardActive ? "Закрыть" : "Открыть клавиатуру"}
          </Button>

          {keyboardActive && <Keyboard currentSymbol={currentSymbol} />}
        </>
      ) : (
        <Statistics
          closeStatistic={() => {
            setShowStats(false);
            dispatch(fetchText({ textType, textNumber }));
          }}
        />
      )}
    </Box>
  );
};

export default FormTypingText;
