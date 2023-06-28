import { useEffect, useState } from "react";
import "./App.css";
import { Container, Typography } from "@mui/material";
import Header from "./components/Header/index";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchText } from "./store/asyncActions/fetchText";
import { TextTypeEnum } from "./types/TextTypeEnum";
import FormTypingText from "./components/FormTypingText";

const App = () => {
  const [textType, setTextType] = useState<TextTypeEnum>(TextTypeEnum.SENTENCE);
  const [textNumber, setTextNumber] = useState(2);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchText({ textType, textNumber }));
  }, [textType, textNumber]);

  const { text, isLoading, error } = useAppSelector(
    (state) => state.statatistics
  );

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
        {/* <Button variant='outlined'>Начать писать</Button> */}
      </Container>
    </>
    
  );
};

export default App;
