import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Box, Container, LinearProgress, Typography } from "@mui/material";
import Header from "./components/Header/index";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchText } from "./store/asyncActions/fetchText";
import { TextTypeEnum } from "./types/TextTypeEnum";
import FormTypingText from "./components/FormTypingText";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import TypingPage from "./pages/TypingPage";
import HistoryPage from "./pages/HistoryPage";
import { routesEnum } from "./types/routesEnum";
import Footer from "./components/Footer";

const App = () => {
  const { textType, textNumber } = useAppSelector((state) => state.statistics);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchText({ textType, textNumber }));
  }, [textType, textNumber]);

  const headerProps = { textType, textNumber };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: 'column',
      minHeight: "100vh"
    }}>
      <Header {...headerProps} />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
        }}
      >
        <Routes>
          <Route path={routesEnum.TYPING} element={<TypingPage />} />
          <Route path={routesEnum.HISTORY} element={<HistoryPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
};

export default App;
