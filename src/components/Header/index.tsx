import {
  Box,
  SxProps,
  Typography,
  AppBar,
  Toolbar,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Timer from "./Timer/index";
import { TextTypeEnum } from "../../types/TextTypeEnum";
import { setTypeAndNumberText } from "../../store/slices/statisticsSlice";
import { setTimer, stopTimer } from "../../store/slices/timerSlice";
import { setMistakes } from "../../store/slices/mistakesSlice";

interface HeaderProps {
  textType: TextTypeEnum;
  textNumber: number;
}

const Header: FC<HeaderProps> = ({}) => {
  const toolbar: SxProps = {
    display: "flex",
    width: "100%",
    gap: "10px",
  };

  const whiteSelect = {
    color: '#ffffff', // Устанавливаем белый цвет текста
    '& .MuiSelect-icon': {
      color: '#ffffff', // Устанавливаем белый цвет иконки
    },
    '&.MuiInputBase-root': {
      '&:before': {
        borderBottomColor: '#ffffff', // Устанавливаем белый цвет нижней границы
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottomColor: '#ffffff', // Устанавливаем белый цвет нижней границы при наведении
      },
      '&.Mui-focused:before': {
        borderBottomColor: '#ffffff', // Устанавливаем белый цвет нижней границы при фокусе
      },
      '&:after': {
        borderBottomColor: '#ffffff', // Устанавливаем белый цвет нижней границы после выбора значения
      },
    },
  }

  const dispatch = useAppDispatch();

  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  const { timer, timerIsStarted } = useAppSelector((state) => state.timer);
  const { textNumber, textType } = useAppSelector(
    (state) => state.statatistics
  );

  const handleTimerIsStarted = () => {
    dispatch(stopTimer());
    dispatch(setTimer(0));
    dispatch(setMistakes(0));
  };

  const handleTypeTextChange = (e: SelectChangeEvent<TextTypeEnum>) => {
    const type = e.target.value;
    if (type === TextTypeEnum.PARAGRAPH || type === TextTypeEnum.SENTENCE)
      dispatch(setTypeAndNumberText({ textNumber, textType: type }));

    timerIsStarted && handleTimerIsStarted();
  };

  const handleTextNumberChange = (e: SelectChangeEvent<number>) => {
    if (typeof e.target.value === "number")
      dispatch(setTypeAndNumberText({ textNumber: e.target.value, textType }));

    timerIsStarted && handleTimerIsStarted();
  };



  return (
    <AppBar position="static">
      <Toolbar sx={toolbar}>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
          }}
        >
          Количество ошибок:{" "}
          <Typography component="span" variant="h6">
            {mistakesCount}
          </Typography>
        </Typography>
        <Select
          labelId="text-type-select"
          onChange={handleTypeTextChange}
          label="Тип:"
          value={textType}
          autoWidth
          variant="standard"
          sx={whiteSelect}
        >
          {Object.values(TextTypeEnum).map((type) => {
            let name =
              type === TextTypeEnum.SENTENCE ? "предложений" : "параграфов";
            return (
              <MenuItem key={type} value={type}>
                {name}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          labelId="text-number-select"
          onChange={handleTextNumberChange}
          label="Количество:"
          value={textNumber}
          autoWidth
          variant="standard"
          sx={whiteSelect}
        >
          {[1, 2, 3, 4, 5].map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>

        <Timer />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
