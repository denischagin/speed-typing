import { Container, LinearProgress } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import FormTypingText from "../components/FormTypingText";

const TypingPage = () => {
  const { text } = useAppSelector((state) => state.statistics);

  return (
    <Container>
      <FormTypingText printingText={text} />
    </Container>
  );
};

export default TypingPage;
