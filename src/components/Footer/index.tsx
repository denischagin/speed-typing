import { Box, Grid, IconButton, Link, useTheme } from "@mui/material";
import Container from "../Container";
import { Typography } from "@mui/material";
import { Email, GitHub, Telegram } from "@mui/icons-material";

const Footer = () => {
  const { palette } = useTheme();
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: palette.pastel.blue.dark,
        marginTop: "auto",
        flexShrink: 0,
      }}
    >
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: '3px 7px'
          }}
        >
          <Typography variant="subtitle1">
            Социальные сети:
          </Typography>
          <Box gap="4px">
            <IconButton
              href="https://github.com/denischagin"
              target="_blank"
              rel="noopener"
            >
              <GitHub />
            </IconButton>
            <IconButton
              href="https://t.me/cheek_react"
              target="_blank"
              rel="noopener"
            >
              <Telegram />
            </IconButton>
            <IconButton
              href="mailto:denischaginnn@gmail.com"
              target="_blank"
              rel="noopener"
            >
              <Email />
            </IconButton>
            <IconButton>
              
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
