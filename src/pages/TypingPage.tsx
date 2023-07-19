import { Container, LinearProgress } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import FormTypingText from "../components/FormTypingText";

const TypingPage = () => {
  const { text } = useAppSelector((state) => state.statistics);

  return (
    <Container>
      <FormTypingText words={text.split(" ")} />
    </Container>
  );
};

export default TypingPage;
