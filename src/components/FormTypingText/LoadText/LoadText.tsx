import React, { FC, useState } from "react";
import { useAppDispatch } from "../../../hooks/redux";
import { setText } from "../../../store/slices/statisticsSlice";
import {
  Box,
  Button,
  Modal,
  SxProps,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import SnackbarWithAlert from "../../SnackbarWithAlert/SnackbarWithAlert";
import { setTimer, stopTimer } from "../../../store/slices/timerSlice";

const LoadText = () => {
  const palette = useTheme().palette;

  const [openModal, setOpenModal] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [textValue, setTextValue] = useState("");

  const modalContent: SxProps = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  const dispatch = useAppDispatch();

  const handleLoadText = () => {
    if (textValue.trim().length === 0) return handleOpenErrorSnackbar();
    dispatch(setText(textValue.trim()));
    dispatch(stopTimer());
    dispatch(setTimer(0));

    handleCloseModal();
    handleOpenSuccessSnackbar();
  };

  // handles error snackbar
  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const handleOpenErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  // handles success snackbar
  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };

  const handleOpenSuccessSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };

  // handles modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: palette.primary.dark,
        }}
        onClick={handleOpenModal}
      >
        Загрузить свой текст
      </Button>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalContent}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Введите свой текст:
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{ display: "flex", flexDirection: "column", mt: 2, gap: 2 }}
          >
            <TextField
              fullWidth
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              rows={5}
              maxRows={40}
              multiline
            />
            <Button variant="outlined" onClick={handleLoadText}>
              Сохранить
            </Button>
          </Box>
        </Box>
      </Modal>

      <SnackbarWithAlert
        open={openErrorSnackbar}
        onClose={handleCloseErrorSnackbar}
        severity="error"
        backgroundColor={palette.error.light}
        text="Вы не ввели текст! Попробуйте еще раз"
      />

      <SnackbarWithAlert
        open={openSuccessSnackbar}
        onClose={handleCloseSuccessSnackbar}
        severity="success"
        backgroundColor={palette.success.light}
        text="Вы успешно ввели текст!"
      />
    </>
  );
};

export default LoadText;
