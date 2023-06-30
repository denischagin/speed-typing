import { Box, SxProps, Typography, AppBar, Toolbar } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Timer from "./Timer/index";
import { TextTypeEnum } from "../../types/TextTypeEnum";

interface HeaderProps {
  textType: TextTypeEnum;
  textNumber: number;
}

const Header: FC<HeaderProps> = ({}) => {
  const toolbar: SxProps = {
    display: "flex",
    width: "100%",
  };

  const { mistakesCount } = useAppSelector((state) => state.mistakes);
  console.log(mistakesCount)

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

        <Timer />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
