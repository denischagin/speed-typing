import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Container, LinearProgress, Typography } from "@mui/material";
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

const App = () => {
  const { textType, textNumber } = useAppSelector(
    (state) => state.statistics
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchText({ textType, textNumber }));
  }, [textType, textNumber]);

  const headerProps = { textType, textNumber };

  return (
    <>
      <Header {...headerProps} />
      <Routes>
        <Route path={routesEnum.TYPING} element={<TypingPage/>} />
        <Route path={routesEnum.HISTORY} element={<HistoryPage/>} />
      </Routes>
    </>
  );
};

export default App;
