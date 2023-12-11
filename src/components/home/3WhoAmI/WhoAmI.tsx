import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";

import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Professional from "./Professional";
import { useTranslation } from "next-i18next";
import { ABOUT_ME_SECTION_LINKS } from "@/config/metaConfigs";

import { ProfessionalHistoryProps } from "./Professional";

export function WhoAmI() {
  const { t, i18n } = useTranslation();

  const openLink = (link: string) =>
    typeof window !== "undefined" && window.open(link);

  return (
    <Container
      id={t("navbar.home").toLowerCase()}
      maxWidth="md"
      sx={{
        backgroundColor: "#f1f1f1",
        borderRadius: "0.5%",
        marginTop: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: { xs: "1000px", sm: "700px", md: "500px" },
        }}
      >
        <Avatar
          alt="Lucas Tejedor"
          id="quemsou"
          src="https://firebasestorage.googleapis.com/v0/b/lucas-tejedor.appspot.com/o/otimizado%2FProfile.png?alt=media&token=6d9041b5-c560-4009-a6c3-d8ecd1f1d5cf"
          sx={{ width: 150, height: 150, mt: 2 }} // use theme spacing units
        />
        <Typography variant="h3" sx={{ mt: 3, fontWeight: 300 }}>
          {t("aboutMe.aboutTitle")}
        </Typography>
        <Typography sx={{ mt: 2 }} paragraph align="justify">
          {t("aboutMe.aboutDescription")}
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {[
            {
              label: "Instagram",
              icon: <InstagramIcon />,
              link: ABOUT_ME_SECTION_LINKS.instagram,
            },
            {
              label: "LinkedIn",
              icon: <LinkedInIcon />,
              link: ABOUT_ME_SECTION_LINKS.linkedin,
            },
          ].map(({ label, icon, link }) => (
            <IconButton
              key={label}
              aria-label={label}
              onClick={() => openLink(link)}
              sx={{ "&:first-of-type": { mr: 1 }, "&:last-of-type": { ml: 1 } }}
            >
              {icon}
            </IconButton>
          ))}
        </Box>
      </Box>
      <Divider sx={{ backgroundColor: "#f1f1f1", mt: 2 }}>
        <Typography sx={{ fontWeight: 300, fontSize: 25 }}>
          {t("aboutMe.professionalHistory.title")}
        </Typography>
      </Divider>
      <Professional
        professionalHistory={
          i18n.t("common:aboutMe.professionalHistory.history", {
            returnObjects: true,
          }) as unknown as ProfessionalHistoryProps[]
        }
      />
    </Container>
  );
}
