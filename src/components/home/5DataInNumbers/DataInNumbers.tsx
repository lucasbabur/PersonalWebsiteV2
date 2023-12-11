import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { FaMedal } from "react-icons/fa";
import { MdExtension } from "react-icons/md";
import { RiArticleFill } from "react-icons/ri";

import { useTranslation } from "next-i18next";

import InfoArea from "./InfoArea";

export function DataInNumbers() {
  const { t } = useTranslation("common");
  return (
    <Container>
      <Grid
        container
        spacing={4}
        style={{ marginTop: "10px", justifyContent: "center" }}
      >
        <Grid item xs={9} sm={10} md={4}>
          <InfoArea
            title={t("dataInNumbers.prizes")}
            number={19}
            icon={<FaMedal size={30} />}
          />
        </Grid>
        <Grid item xs={9} sm={5} md={4}>
          <InfoArea
            title={t("dataInNumbers.projects")}
            number={17}
            icon={<MdExtension size={30} />}
          />
        </Grid>
        <Grid item xs={9} sm={5} md={4}>
          <InfoArea
            title={t("dataInNumbers.publishedPapers")}
            number={5}
            icon={<RiArticleFill size={30} />}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
