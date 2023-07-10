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

  const [selectedFontFamily, setSelectedFontFamily] = useState(fontFamily);
  const [selectedFontSize, setSelectedFontSize] = useState(fontSize);
  const [selectedFontWeight, setSelectedFontWeight] = useState(fontWeight);

  const handleSubmitSettings = () => {
    dispatch(setFontFamily(selectedFontFamily));
    dispatch(setFontSize(selectedFontSize.toString() + "px"));
    dispatch(setFontWeight(selectedFontWeight));
  };

  const handleFontFamilyChange = (event: SelectChangeEvent) => {
    setSelectedFontFamily(event.target.value as FontFamilyType);
  };

  const handleFontSizeChange = (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => {
    setSelectedFontSize(value.toString());
  };

  const handleFontWeightChange = (event: SelectChangeEvent) => {
    setSelectedFontWeight(event.target.value as FontWeightType);
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            p: "0 3px",
          }}
        >
          <ListItem>
            <Typography variant="h6">Настроить шрифт:</Typography>
          </ListItem>

          <Divider  />

          <List sx={{ width: "100%" }}>
            <ListItem
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "75px",
                borderRadius: "3px",
                boxShadow: `inset 0px 0px 2px 1px ${palette.grey[500]}`,
              }}
            >
              <Typography
                sx={{
                  fontWeight: selectedFontWeight,
                  fontFamily: selectedFontFamily,
                  fontSize: selectedFontSize + "px",
                }}
              >
                Пример текста
              </Typography>
            </ListItem>

            <ListItem sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="subtitle1">Тип шрифта</Typography>
              <Select
                fullWidth
                value={selectedFontFamily}
                sx={{
                  fontFamily: selectedFontFamily,
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
              <Typography>Размер шрифта: {selectedFontSize}</Typography>
              <Slider
                value={parseInt(selectedFontSize)}
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
                value={selectedFontWeight}
                sx={{ fontWeight: selectedFontWeight }}
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
            <ListItem>
              <Button variant="outlined" onClick={handleSubmitSettings}>
                Применить
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
