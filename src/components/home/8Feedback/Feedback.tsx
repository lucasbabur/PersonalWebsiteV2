import React from "react";

import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FeedbackCard } from "./FeedbackCard";

import { useTranslation } from "next-i18next";

export function Feedback() {
  const { t, i18n } = useTranslation("common");

  return (
    <>
      <Divider style={{ marginTop: "50px" }}>
        <Typography style={{ fontWeight: 300, fontSize: 35 }} id="feedback">
          Feedback
        </Typography>
      </Divider>
      <Container
        sx={{ py: 2 }}
        style={{ marginTop: "70px" }}
        maxWidth="md"
        component="div"
      >
        <Grid container spacing={4} style={{ justifyContent: "center" }}>
          {i18n
            .t("common:feedback", {
              returnObjects: true,
            })
            .map((person, index) => (
              <FeedbackCard
                name={person.name}
                subtitle={person.subtitle}
                description={person.description}
                avatar={person.link}
                key={person.name + index}
              />
            ))}
        </Grid>
      </Container>
    </>
  );
}
