import React, {
  FC,
  ChangeEvent,
  MouseEventHandler,
  ReactNode,
  memo,
} from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { TextTypeEnum } from "../../types/TextTypeEnum";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setTypeAndNumberText } from "../../store/slices/statisticsSlice";
import { fetchText } from "../../store/asyncActions/fetchText";
import Timer from "../FormTypingText/Timer";
import LoadText from "../FormTypingText/LoadText";

const StatsSection: FC = () => {
  const dispatch = useAppDispatch();

  const { textNumber, textType } = useAppSelector(
    (state) => state.statistics,
    (a, b) => a.textNumber === b.textNumber && a.textType === b.textType
  );
  const { mistakesCount } = useAppSelector((state) => state.mistakes);

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
    <>
      <Typography variant="body1">
        Количество ошибок:{" "}
        <Typography component="span" variant="h6">
          {mistakesCount}
        </Typography>
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "10px",
        }}
      >
        <Select
          labelId="text-type-select"
          onChange={handleTypeTextChange}
          label="Тип:"
          value={textType}
          autoWidth
          variant="standard"
        >
          {/* Опции выбора типа текста */}
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
        >
          {/* Опции выбора количества текста */}
          {[1, 2, 3, 4, 5].map((number) => (
            <MenuItem key={number} value={number}>
              {number}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" onClick={handleButtonNewText}>
          Другой текст
        </Button>
      </Box>

      <LoadText />
    </>
  );
};

export default memo(StatsSection);
