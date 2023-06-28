import { PaletteColorOptions, createTheme } from "@mui/material";

const RED = {
  "50": "#f8e6e5",
  "100": "#edc0bf",
  "200": "#e19695",
  "300": "#d46b6a",
  "400": "#cb4c4a",
  "500": "#c22c2a",
  "600": "#bc2725",
  "700": "#b4211f",
  "800": "#ac1b19",
  "900": "#9f100f",
  A100: "#ffcfcf",
  A200: "#ff9c9c",
  A400: "#ff6a69",
  A700: "#ff504f",
  contrastText: "white"
};

const BLUE = {
  "50": "#e8eaf6",
  "100": "#c5cbe9",
  "200": "#9fa8da",
  "300": "#7985cb",
  "400": "#5c6bc0",
  "500": "#3f51b5",
  "600": "#394aae",
  "700": "#3140a5",
  "800": "#29379d",
  "900": "#1b278d",
  A100: "#c6cbff",
  A200: "#939dff",
  A400: "#606eff",
  A700: "#4757ff",
  contrastText: "white"
};

export const createCustomTheme = () => {
  return createTheme({
    palette: {
      primary: {
        main: BLUE[500],
        light: BLUE["A100"],
        contrastText: BLUE.contrastText,
        dark: BLUE[700],
      },
      error: {
        main: RED[500],
        light: RED["A100"],
        contrastText: RED.contrastText,
        dark: RED[700],
      },
    },
  });
};
