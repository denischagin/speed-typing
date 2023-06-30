import { createContext, useEffect, useState } from "react";
import "./App.css";
import { Container, Typography } from "@mui/material";
import Header from "./components/Header/index";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchText } from "./store/asyncActions/fetchText";
import { TextTypeEnum } from "./types/TextTypeEnum";
import FormTypingText from "./components/FormTypingText";
import { Provider } from "react-redux";
import TextProvider from "./providers/TextProvider";
import { useText } from "./context/textContext";

const App = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error, text, textType, textNumber } = useAppSelector(
    (state) => state.statatistics
  );

  const { getNewText } = useText()

  useEffect(() => {
    console.log(getNewText)
    getNewText(textType, textNumber)
  }, [textType, textNumber]);

  if (isLoading) return <Typography variant="h5">Загрузка...</Typography>;
  if (error)
    return (
      <Typography variant="h5" color="error">
        {error}
      </Typography>
    );

  const headerProps = { textType, textNumber };

  return (
    <>
      <Header {...headerProps} />
      <Container>
        <FormTypingText printingText={text} />
      </Container>
    </>
  );
};

export default App;
function getNewText(): any {
  throw new Error("Function not implemented.");
}
