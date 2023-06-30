import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Container, LinearProgress, Typography } from "@mui/material";
import Header from "./components/Header/index";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchText } from "./store/asyncActions/fetchText";
import { TextTypeEnum } from "./types/TextTypeEnum";
import FormTypingText from "./components/FormTypingText";
import { Provider } from "react-redux";

const App = () => {
  const { isLoading, text, textType, textNumber } = useAppSelector(
    (state) => state.statatistics
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchText({ textType, textNumber }));
  }, [textType, textNumber]);

  const headerProps = { textType, textNumber };

  return (
    <>
      <Header {...headerProps} />
      <Container>
        {isLoading ? (
          <LinearProgress sx={{ marginTop: "10px" }} />
        ) : (
          <FormTypingText printingText={text} />
        )}
      </Container>
    </>
  );
};

export default App;
