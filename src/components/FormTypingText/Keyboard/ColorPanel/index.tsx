import { Box, SxProps, Typography, useTheme } from "@mui/material";
import React, { memo } from "react";

const ColorPanel = () => {
  const commonColorStyle: SxProps = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    border: "1px solid rgba(0, 0, 0, 0.5)",
  };

  const commonItemColor: SxProps = {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  };

  const theme = useTheme();

  const colorFinger = theme.fingers;
  return (
    <Box
      display="flex"
      mt="10px"
      justifyContent="space-evenly"
      borderTop="2px solid rgba(0, 0, 0, 0.5)"
      pt="10px"
      pb="10px"
    >
      <Box sx={commonItemColor}>
        <Box
          sx={{
            ...commonColorStyle,
            backgroundColor: colorFinger.leftIndex,
          }}
        />
        <Box
          sx={{
            ...commonColorStyle,
            backgroundColor: colorFinger.rightIndex,
          }}
        />
        <Typography>- указательные</Typography>
      </Box>

      <Box sx={commonItemColor}>
        <Box
          sx={{
            ...commonColorStyle,
            backgroundColor: colorFinger.middle,
          }}
        />
        <Typography>- средний</Typography>
      </Box>

      <Box sx={commonItemColor}>
        <Box
          sx={{
            ...commonColorStyle,
            backgroundColor: colorFinger.ring,
          }}
        />
        <Typography>- безымянный</Typography>
      </Box>

      <Box sx={commonItemColor}>
        <Box
          sx={{
            ...commonColorStyle,
            backgroundColor: colorFinger.pinky,
          }}
        />
        <Typography>- мизинец</Typography>
      </Box>

      <Box sx={commonItemColor}>
        <Box
          sx={{
            ...commonColorStyle,
            backgroundColor: colorFinger.thumb,
          }}
        />
        <Typography>- большой</Typography>
      </Box>
    </Box>
  );
};

export default memo(ColorPanel);
