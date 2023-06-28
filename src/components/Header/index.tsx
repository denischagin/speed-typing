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
  const { mistakesCount } = useAppSelector((state) => state.mistakes);

  return (
    <Box component="header" sx={header}>
      <Typography
        variant="body1"
        sx={{
          flexGrow: 1,
        }}
      >
        Количество ошибок: <Typography component="span" fontWeight="bold">{mistakesCount}</Typography>
      </Typography>

      <Timer />


    </Box>
  );
};

export default Header;
