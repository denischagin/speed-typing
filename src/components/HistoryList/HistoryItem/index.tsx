import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Modal,
  SxProps,
  Button,
  useTheme,
} from "@mui/material";
import textIcon from "../../../assets/text-icon.svg";
import trashIcon from "../../../assets/trash-icon.svg";
import { IHistoryStatistic } from "../../../types/IHistoryStatistic";
import { useAppDispatch } from "../../../hooks/redux";
import { removeTypingHistory } from "../../../store/slices/statisticsSlice";
import { convertMillisecondsToTime } from "../../../helpers/convertMillisecondsToTime";

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
  index: number;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ attempt, index }) => {
  const { pastel } = useTheme().palette;
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        background: index % 2 === 0 ? pastel.blue[200] :  pastel.blue[100],
        borderRadius: "10px",
        p: "0 20px",
        "* + &": {
          mt: "10px",
        },
      }}
    >
      <Box
        display="flex"
        padding="10px"
        alignItems="center"
        border={`1px solid $`}
      >
        <Box aria-label="attempt" display="flex" gap="5px" flexGrow={1}>
          <Typography sx={{ wordBreak: "break-all" }}>
            {attempt.printSpeedLetterPerMinute} символов в минуту,
          </Typography>

          <Typography sx={{ wordBreak: "break-all" }}>
            {attempt.printSpeedWordsPerMinute} слов в минуту.
          </Typography>

          <Typography sx={{ wordBreak: "break-all" }}>
            {attempt.mistakes} ошибок,
          </Typography>

          <Typography sx={{ wordBreak: "break-all" }}>
            Потрачено времени: {convertMillisecondsToTime(attempt.time)} ,
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

        <IconButton
          onClick={() => dispatch(removeTypingHistory(attempt.id))}
    
        >
          <Box
            aria-label="trashIcon"
            component="img"
            src={trashIcon}
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
    </Box>
  );
};

export default HistoryItem;
