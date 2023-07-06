import React, { FC, ChangeEvent, MouseEventHandler, ReactNode } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import { TextTypeEnum } from "../../../../types/TextTypeEnum";

interface StatsSectionProps {
  mistakesCount: number;
  textType: TextTypeEnum;
  textNumber: number;
  handleTypeTextChange: (
    event: SelectChangeEvent<TextTypeEnum>,
    child: ReactNode
  ) => void;
  handleTextNumberChange: (
    event: SelectChangeEvent<number>,
    child: ReactNode
  ) => void;
  handleButtonNewText: MouseEventHandler<HTMLButtonElement>;
}

const StatsSection: FC<StatsSectionProps> = ({
  mistakesCount,
  textType,
  textNumber,
  handleTypeTextChange,
  handleTextNumberChange,
  handleButtonNewText,
}) => {
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
    </>
  );
};

export default StatsSection;
