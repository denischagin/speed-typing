import { Box, SxProps, Typography } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Timer from "./Timer/index";
import { TextTypeEnum } from "../../types/TextTypeEnum";

interface HeaderProps {
  textType: TextTypeEnum;
  textNumber: number;
}

const header: SxProps = {
  display: "flex",
  width: "100%",
};

const Header: FC<HeaderProps> = ({}) => {
  const dispatch = useAppDispatch();

  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  return (
    <Box component="header" sx={header}>
      <Typography
        variant="body1"
        sx={{
          flexGrow: 1,
        }}
      >
        Количество ошибок: {mistakesCount}
      </Typography>

      <Timer />
      {/* <Button variant='outlined' onClick={() => dispatch(timerActions.startStopTimer())}>Начать печатать</Button> */}
    </Box>
  );
};

export default Header;
