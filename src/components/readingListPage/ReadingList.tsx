import React from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { BookCard } from "./BookCard";
import { Navbar } from "../projectsPage";

import { useTranslation } from "next-i18next";

export interface ReadingListProps {
  title: string;
  actualBook?: React.ReactNode;
  icon?: React.ReactNode;
  data: Array<{
    image: string;
    subtitle: string;
    title: string;
    description: string;
  }>;
}

export function ReadingList(props: ReadingListProps) {
  const { t } = useTranslation("readingListPage");

  return (
    <>
      <Navbar />
      <Container sx={{ py: 8, mt: 3, minHeight: "110vh" }} maxWidth="md">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" sx={{ fontWeight: 300 }}>
            {props.title} {props.icon}
          </Typography>
        </Box>
        <Typography align="center">
          {t("numberOfBooksRead")} <b>{props?.data?.length}</b>
        </Typography>
        <Box display={"flex"} justifyContent="center">
          <BookCard
            image={t("currentBook.image")}
            author={t("currentBook.author")}
            title={t("currentBook.title")}
          />
        </Box>
        <Grid container spacing={4} sx={{ mt: 1 }}>
          {props.data.map((data, index) => (
            <Grid key={index + data.title} item xs={12} sm={6} md={4}>
              <BookCard
                image={data.image}
                author={data.subtitle}
                title={data.title}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
