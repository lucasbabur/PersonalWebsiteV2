import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useTranslation } from "next-i18next";

export function Footer() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        p: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      component="footer"
    >
      <EmojiEmotionsIcon color="primary" style={{ marginBottom: "10px" }} />
      <Typography
        variant="subtitle1"
        align="center"
        color="text.secondary"
        component="p"
        style={{ display: "flex", textAlign: "center" }}
      >
        {t("footer")} Lucas Tejedor ©
      </Typography>
    </Box>
  );
}
