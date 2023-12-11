import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useTheme } from "@mui/material/styles";

import { Link } from "react-scroll";
import { useTranslation } from "next-i18next";

import { STANDARD_LINKS_PROPS } from "@/config/metaConfigs";

export function Navbar() {
  const { t } = useTranslation("common");

  const pages = [t("navbar.home"), t("navbar.feedback"), t("navbar.contact")];
  type Pages = typeof pages;

  const MobileNavMenu = (props: { pages: Pages }) => {
    const theme = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
    };

    const mobileMenuStyles = {
      minWidth: "250px",
      height: "60px",
      fontSize: "16px",
      margin: "8px 0px 8px 0px",
    };

    return (
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="open menu of pages"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={toggleMobileMenu}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          open={mobileMenuOpen}
          onClose={toggleMobileMenu}
          sx={{
            ".MuiDrawer-paper": {
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: theme.palette.creamWhite.main,
            },
          }}
        >
          <IconButton
            size="large"
            aria-label="open menu of pages"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="primary"
            onClick={toggleMobileMenu}
          >
            <CloseIcon />
          </IconButton>
          {props.pages.map((page) => (
            <Link {...STANDARD_LINKS_PROPS} key={page} to={page.toLowerCase()}>
              <Button
                key={page}
                onClick={toggleMobileMenu}
                sx={mobileMenuStyles}
              >
                {page}
              </Button>
            </Link>
          ))}
          <Link
            {...STANDARD_LINKS_PROPS}
            to={t("navbar.projects").toLowerCase()}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{
                ...mobileMenuStyles,
                height: "48px",
                marginTop: "8px",
              }}
              onClick={toggleMobileMenu}
            >
              {t("navbar.projects")}
            </Button>
          </Link>
        </Drawer>
      </Box>
    );
  };

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
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {props.pages.map((page) => (
          <Link key={page} to={page.toLowerCase()} {...STANDARD_LINKS_PROPS}>
            <Button key={page} sx={buttonStyles}>
              {page}
            </Button>
          </Link>
        ))}
        <Link to={t("navbar.projects").toLowerCase()} {...STANDARD_LINKS_PROPS}>
          <Button
            variant="contained"
            color="secondary"
            sx={{
              marginLeft: "24px",
              width: "128px",
            }}
          >
            {t("navbar.projects")}
          </Button>
        </Link>
      </Box>
    );
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6">Lucas Tejedor</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <MobileNavMenu pages={pages} />
          <DesktopNavMenu pages={pages} />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
