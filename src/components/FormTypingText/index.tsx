import {
  useState,
  useRef,
  useEffect,
  FC,
  MouseEventHandler,
  memo,
  useMemo,
} from "react";
import PrintableText from "./PrintableText/index";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setTimer, startTimer, stopTimer } from "../../store/slices/timerSlice";
import Statistics from "./Statistics";
import { setCurrentSymbol } from "../../store/slices/keyboardSlice";
import {
  incrementMistakes,
  setMistakes,
} from "../../store/slices/mistakesSlice";
import {
  Box,
  SxProps,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  LinearProgress,
} from "@mui/material";
import Keyboard from "./Keyboard";
import { fetchText } from "../../store/asyncActions/fetchText";
import LoadText from "./LoadText";
import { TextTypeEnum } from "../../types/TextTypeEnum";
import { setTypeAndNumberText } from "../../store/slices/statisticsSlice";
import Timer from "./Timer/index";
import StatsSection from "./PrintableText/StatsSection";

interface IFormTypingTextProps {
  printingText: string;
}

const FormTypingText: FC<IFormTypingTextProps> = ({ printingText = "" }) => {
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
  const [words, setWords] = useState<string[]>([]);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const customEqual = (oldValue: any, newValue: any) =>
    oldValue.timerIsStarted === newValue.timerIsStarted;

  const { timerIsStarted } = useAppSelector(
    (state) => state.timer,
    customEqual
  );

  const timerIsStartedMemo = useMemo(() => timerIsStarted, [timerIsStarted]);

  const { isLoading, textNumber, textType } = useAppSelector(
    (state) => state.statistics
  );
  const { mistakesCount } = useAppSelector((state) => state.mistakes);

  useEffect(() => {
    if (printingText == "") return;
    startNewText();
  }, [printingText]);

  useEffect(() => {
    if (words.length === 0) return;
    if (words.length === currentWordIndex) return stopTimerAndShowStats();

    dispatch(setCurrentSymbol(words[currentWordIndex][0]));
  }, [currentWordIndex]);

  const startNewText = () => {
    const newWords = printingText.split(" ");
    setWords(newWords);
    setValue("");
    setIsErrorInput(false);
    setCurrentWordIndex(0);
    dispatch(stopTimer());
    dispatch(setTimer(0));
    dispatch(setCurrentSymbol(newWords[0][0]));
    dispatch(setMistakes(0));
  };

  const stopTimerAndShowStats = () => {
    setShowStats(true);
    dispatch(stopTimer());
  };

  const onInputStart = (value: string) => {
    if (!timerIsStartedMemo && value.length >= 1) dispatch(startTimer());
  };

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    setValue(currentValue);
    onInputStart(currentValue);

    const lastSymbol = currentValue[currentValue.length - 1];
    const wordInValue = currentValue.substring(0, currentValue.length - 1);

    if (
      words[currentWordIndex].startsWith(currentValue) ||
      (lastSymbol === " " && words[currentWordIndex] === wordInValue)
    ) {
      setIsErrorInput(false);

      if (lastSymbol === " ") {
        setCurrentWordIndex((prev) => (prev += 1));
        setValue("");
      }

      const currentSymbol: string | undefined =
        words[currentWordIndex][currentValue.length];

      if (currentSymbol === undefined)
        return dispatch(setCurrentSymbol("Space"));

      dispatch(setCurrentSymbol(currentSymbol));
    } else {
      !isErrorInput && dispatch(incrementMistakes());
      setIsErrorInput(true);
    }
  };

  const handleTypeTextChange = (e: SelectChangeEvent<TextTypeEnum>) => {
    const type = e.target.value;
    if (type === TextTypeEnum.PARAGRAPH || type === TextTypeEnum.SENTENCE)
      dispatch(setTypeAndNumberText({ textNumber, textType: type }));
  };

  const handleTextNumberChange = (e: SelectChangeEvent<number>) => {
    if (typeof e.target.value === "number")
      dispatch(setTypeAndNumberText({ textNumber: e.target.value, textType }));
  };

  const handleButtonNewText: MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(fetchText({ textNumber, textType }));
  };

  return (
    <Box sx={formTypingTextWrapper}>
      {!showStats ? (
        <>
          <Box display="flex" justifyContent="space-between" width="100%">
            <StatsSection
              mistakesCount={mistakesCount}
              textType={textType}
              textNumber={textNumber}
              handleTypeTextChange={handleTypeTextChange}
              handleTextNumberChange={handleTextNumberChange}
              handleButtonNewText={handleButtonNewText}
            />

            <LoadText />
            <Timer />
          </Box>

          {!isLoading ? (
            <PrintableText
              currentWordIndex={currentWordIndex}
              words={words}
              isError={isErrorInput}
            />
          ) : (
            <LinearProgress sx={{ width: "100%", m: "40px" }} />
          )}

          <TextField
            inputRef={textFieldInputRef}
            label="Введите текст..."
            sx={inputWord}
            variant="outlined"
            type="text"
            error={isErrorInput}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handlerInputChange(e);
            }}
          />

          <Button
            onClick={() => setKeyboardActive((prev) => !prev)}
            variant="outlined"
          >
            {keyboardActive ? "Закрыть" : "Открыть клавиатуру"}
          </Button>

          {keyboardActive && <Keyboard />}
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
