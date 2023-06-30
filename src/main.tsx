import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { store } from "./store/index";
import { ThemeProvider, createTheme } from "@mui/material";
import { createCustomTheme } from "./theme/palette";
import TextProvider from "./providers/TextProvider";

const theme = createCustomTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <TextProvider>
        <App />
      </TextProvider>
    </Provider>
  </ThemeProvider>
);
