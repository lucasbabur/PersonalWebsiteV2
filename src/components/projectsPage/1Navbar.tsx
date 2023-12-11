import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useTheme } from "@mui/material/styles";

import { useTranslation } from "next-i18next";

export function Navbar() {
  const { t } = useTranslation("projectsCommon");

  const pages = [t("navbar.goBackButton")];
  type Pages = typeof pages;

  const DesktopNavMenu = (props: { pages: Pages }) => {
    const theme = useTheme();

    const buttonStyles = {
      my: 2,
      color: "white",
      display: "block",
      height: "34px",
      minWidth: "64px",
      margin: "0px 16px",

      "&:hover": {
        backgroundColor: theme.palette.primary.dark,
      },
    };

    return (
      <Box>
        {props.pages.map((page) => (
          <Button key={page} sx={buttonStyles} href="/">
            {page}
          </Button>
        ))}
      </Box>
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6">Lucas Tejedor</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <DesktopNavMenu pages={pages} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
