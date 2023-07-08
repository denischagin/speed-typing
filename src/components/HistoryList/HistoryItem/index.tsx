import React, { useState } from "react";
import { Box, Typography, IconButton, Modal, SxProps } from "@mui/material";
import textIcon from "../../../assets/text-icon.svg";
import { IHistoryStatistic } from "../../../types/IHistoryStatistic";

const modalContent: SxProps = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "1000px",
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
  wordBreak: "break-all",
};

interface HistoryItemProps {
  attempt: IHistoryStatistic;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ attempt }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box display="flex" padding="10px" alignItems="center">
      <Box aria-label="attempt" display="flex" gap="5px" flexGrow={1}>
        <Typography sx={{ wordBreak: "break-all" }}>
          {attempt.printSpeedLetterPerMinute} символов в минуту,
        </Typography>
        <Typography sx={{ wordBreak: "break-all" }}>
          {attempt.printSpeedWordsPerMinute} слов в минуту.
        </Typography>
      </Box>
      <IconButton onClick={handleOpenModal}>
        <Box
          aria-label="textIcon"
          component="img"
          src={textIcon}
          width="30px"
        />
      </IconButton>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalContent}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Текст:
          </Typography>
          <Box id="modal-modal-description" sx={{ mt: 2 }}>
            <Typography>{attempt.text}</Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HistoryItem;
