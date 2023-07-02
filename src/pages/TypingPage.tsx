import { Container, LinearProgress } from "@mui/material";
import { useAppSelector } from "../hooks/redux";
import FormTypingText from "../components/FormTypingText";

const TypingPage = () => {
  const { isLoading, text } = useAppSelector(
    (state) => state.statatistics
  );

  return (
    <Container>
    {isLoading ? (
      <LinearProgress sx={{ marginTop: "10px" }} />
    ) : (
      <FormTypingText printingText={text} />
    )}
  </Container>
  )
}

export default TypingPage