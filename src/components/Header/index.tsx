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
  Button,
  Modal,
  useTheme,
  Snackbar,
  Alert,
  Drawer,
  ListItem,
  List,
  Checkbox,
  Slider,
  Divider, // Import Slider component
} from "@mui/material";
import { FC, MouseEventHandler, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Timer from "../FormTypingText/Timer/index";
import { TextTypeEnum } from "../../types/TextTypeEnum";
import {
  setText,
  setTypeAndNumberText,
} from "../../store/slices/statisticsSlice";
import { setTimer, stopTimer } from "../../store/slices/timerSlice";
import { setMistakes } from "../../store/slices/mistakesSlice";
import SnackbarWithAlert from "../SnackbarWithAlert";
import { useLocation, useNavigate } from "react-router";
import { routesEnum } from "../../types/routesEnum";
import { fetchText } from "../../store/asyncActions/fetchText";
import {
  FontFamilyType,
  FontSizeType,
  FontWeightType,
  setFontFamily,
  setFontSize,
  setFontWeight,
} from "../../store/slices/settingsSlice";

interface HeaderProps {
  textType: TextTypeEnum;
  textNumber: number;
}

const Header: FC<HeaderProps> = ({}) => {
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toolbar: SxProps = {
    display: "flex",
    width: "100%",
    gap: "10px",
    justifyContent: "space-between",
  };

  const whiteSelect: SxProps = {
    color: "#ffffff",
    "& .MuiSelect-icon": {
      color: "#ffffff",
    },
    "&.MuiInputBase-root": {
      "&:before": {
        borderBottomColor: "#ffffff",
      },
      "&:hover:not(.Mui-disabled):before": {
        borderBottomColor: "#ffffff",
      },
      "&.Mui-focused:before": {
        borderBottomColor: "#ffffff",
      },
      "&:after": {
        borderBottomColor: palette.primary.dark,
      },
    },
  };

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const button = {
    text:
      path === routesEnum.TYPING
        ? "Посмотреть все попытки"
        : "Вернуться обратно",
    to: path === routesEnum.TYPING ? routesEnum.HISTORY : routesEnum.TYPING,
  };

  const { textNumber, textType } = useAppSelector((state) => state.statistics);

  const fontFamilies: FontFamilyType[] = [
    "Roboto",
    "Arial",
    "Comic Sans MS",
    "Tahoma",
    "Verdana",
  ];

  const fontWeightsTranslate: Record<FontWeightType, string> = {
    normal: "обычный",
    bold: "толстый",
  };

  const { fontFamily, fontSize, fontWeight } = useAppSelector(
    (state) => state.settings
  );

  const handleFontFamilyChange = (event: SelectChangeEvent) => {
    const selectedFontFamily = event.target.value as FontFamilyType;
    dispatch(setFontFamily(selectedFontFamily));
  };

  const handleFontSizeChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    const selectedFontSize = value;
    dispatch(setFontSize(selectedFontSize.toString() + "px"));
  };

  const handleFontWeightChange = (event: SelectChangeEvent) => {
    const selectedFontWeight = event.target.value as FontWeightType;
    dispatch(setFontWeight(selectedFontWeight));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={toolbar}>
          <Button
            onClick={() => {
              navigate(button.to, { replace: true });
              if (button.to === routesEnum.TYPING)
                dispatch(fetchText({ textType, textNumber }));
            }}
            variant="contained"
          >
            {button.text}
          </Button>
          <Button variant="contained" onClick={handleDrawerOpen}>
            Настройки
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <Box sx={{ displya: "flex", flexDirection: "column", width: 250 }}>
          <ListItem>
            <Typography variant="h6">Настроить шрифт:</Typography>
          </ListItem>
          <Divider />
          <List sx={{ width: "100%" }}>
            <ListItem sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Тип шрифта</Typography>
              <Select
                fullWidth
                value={fontFamily}
                sx={{
                  fontFamily,
                }}
                onChange={handleFontFamilyChange}
              >
                {fontFamilies.map((fontFamily) => (
                  <MenuItem
                    key={fontFamily}
                    sx={{
                      fontFamily,
                    }}
                    value={fontFamily}
                  >
                    {fontFamily}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>

            <ListItem sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Размер шрифта: {fontSize}</Typography>
              <Slider
                value={parseInt(fontSize)}
                onChange={handleFontSizeChange}
                min={15}
                max={30}
                step={1}
                marks
                valueLabelDisplay="auto"
              />
            </ListItem>
            <ListItem sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Толщина шрифта</Typography>
              <Select
                fullWidth
                value={fontWeight}
                sx={{ fontWeight }}
                onChange={handleFontWeightChange}
              >
                {Object.keys(fontWeightsTranslate).map((fontWeight: string) => (
                  <MenuItem
                    key={fontWeight}
                    sx={{ fontWeight }}
                    value={fontWeight}
                  >
                    {fontWeightsTranslate[fontWeight as FontWeightType]}
                  </MenuItem>
                ))}
              </Select>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
