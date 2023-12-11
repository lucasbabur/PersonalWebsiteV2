import React from "react";
import styles from "../../../styles/7otherConquests.module.css";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { RiBookFill } from "react-icons/ri";
import { GrVulnerability } from "react-icons/gr";

import { useFirebase } from "../../../firebase/firebaseContext";
import { useTranslation } from "next-i18next";

export function OtherConquests() {
  const { t } = useTranslation();

  class customStyles {
    static containerStyle = {
      marginTop: "20px",
      padding: "20px",
    };

    static boxOuterStyle = {
      display: "flex",
      borderRadius: "5px",
      flexDirection: {
        xs: "column",
        sm: "column",
        md: "row-reverse",
        lg: "row-reverse",
        xl: "row-reverse",
      },
      alignItems: "center",
    };

    static imageBoxStyle = {
      marginBottom: "30px",

      width: {
        xs: "250px",
        sm: "250px",
        md: "300px",
        lg: "500px",
      },
      flexShrink: 0,
    };

    static textContentStyle = {
      display: "flex",
      flexGrow: 1,
      flexShrink: 1,
      flexDirection: "column",
      alignItems: {
        xs: "center",
        sm: "center",
        md: "start",
        lg: "start",
        xl: "start",
      },
    };

    static titleStyle = {
      textAlign: "center",
    };

    static descriptionStyle = {
      textAlign: "justify",
      marginTop: "20px",
    };

    static buttonContainerStyle = {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
    };

    static buttonStyle = {
      marginRight: "10px",
      width: "200px",
      borderRadius: "2px",
      marginBottom: "20px", // Added margin-bottom for spacing between buttons
    };
  }

  function renderButton(Icon: any, text: string, href: string) {
    return (
      <Button
        startIcon={<Icon />}
        color="inherit"
        variant="contained"
        style={customStyles.buttonStyle}
        href={href}
      >
        {text}
      </Button>
    );
  }

  return (
    <Container style={customStyles.containerStyle}>
      <Box sx={customStyles.boxOuterStyle}>
        <Box sx={customStyles.imageBoxStyle}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/lucas-tejedor.appspot.com/o/otimizado%2Foioi.png?alt=media&token=9bf3b6a0-c8d1-49b3-bca7-9a6fadb21f98"
            alt="Lucas Tejedor"
            width={500}
            height={500}
            layout="responsive"
          />
        </Box>
        <Box sx={customStyles.textContentStyle}>
          <Typography variant="h4" sx={customStyles.titleStyle}>
            {t("otherAchievements.title")}
          </Typography>
          <Typography sx={customStyles.descriptionStyle}>
            {t("otherAchievements.description")}
          </Typography>
          <Box sx={customStyles.buttonContainerStyle}>
            {renderButton(
              RiBookFill,
              t("otherAchievements.readingList"),
              "readingList"
            )}
            {renderButton(
              GrVulnerability,
              t("otherAchievements.skills"),
              "/skills"
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
