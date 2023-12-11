import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

import { useFirebase } from "../../../firebase/firebaseContext";
import { useTranslation } from "next-i18next";

import { ProjectData } from "../../../firebase/firebaseFunctions";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const { t, i18n } = useTranslation();
  const { functions } = useFirebase();
  const [actualData, setActualData] = useState<ProjectData[]>([]);
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    functions
      .readProjectsFromFirestore(i18n.language)
      .then((data) => {
        console.log(i18n.language);
        const combinedArray = Object.values(data).flat();
        setActualData(combinedArray);
      })
      .catch((error: Error) => {
        console.error("Error fetching projects:", error);
      });
  }, [i18n.language, functions]);

  const TabWidth = styled(Tab)(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
      width: "200px",
    },
    [theme.breakpoints.between("sm", "md")]: {
      width: "150px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100px",
    },
  }));

  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <>
      <Divider style={{ marginTop: "60px" }}>
        <Typography style={{ fontWeight: 300, fontSize: 35 }}>
          {t("projectsSection.title")}
        </Typography>
      </Divider>
      <Typography align="center">{t("projectsSection.description")}</Typography>
      <Box
        sx={{
          flexGrow: 1,
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40px",
        }}
      >
        <Tabs
          id={t("navbar.projects").toLowerCase()}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          aria-label="visible arrows tabs"
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              "&.Mui-disabled": { opacity: 0.3 },
            },
          }}
        >
          <TabWidth label={t("projectsSection.projectsCategory")} />
          <TabWidth label={t("projectsSection.articlesAndBooks")} />
          <TabWidth label={t("projectsSection.personalProjects")} />
          <TabWidth label={t("projectsSection.certificatesFellowships")} />
        </Tabs>
      </Box>
      <div id="meusprojetos" />
      <Container
        sx={{ py: 2 }}
        style={{ marginTop: "25px" }}
        maxWidth="md"
        component="div"
      >
        <Grid container spacing={4} style={{ justifyContent: "center" }}>
          {actualData.map((projeto: ProjectData, index) => {
            if (projeto.category !== value.toString()) return null;
            return (
              <Grid key={projeto.title + index} item xs={9} sm={6} md={4}>
                <ProjectCard {...projeto} />
              </Grid>
            );
          })}
        </Grid>
        <Typography align="center" style={{ marginTop: "30px" }}>
          {t("projectsSection.howMany_1")}
          <b>{actualData.length - 1}</b>
          {t("projectsSection.howMany_2")}
        </Typography>
      </Container>
    </>
  );
}
