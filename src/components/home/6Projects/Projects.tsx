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

import { ProjectCard } from "./ProjectCard";

export interface ProjectsProps {
  fields: {
    title: string;
    description: string;
    cardImage: {
      fields: {
        file: {
          url: string;
          details: {
            image: {
              width: number;
              height: number;
            };
          };
        };
      };
    };
    slugLink: {
      fields: {
        slug: string;
      };
    };
    optionalLink?: string;
    cardOrder: number;
  };
  metadata: {
    tags: {
      sys: {
        id: string;
      };
    }[];
  };
}

export function Projects(props: { projects: ProjectsProps[] }) {
  const { t } = useTranslation();
  const [value, setValue] = useState<number>(0);

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

  const sortedProjects = props.projects.sort(
    (a, b) => a.fields.cardOrder - b.fields.cardOrder
  );

  return (
    <>
      <Divider style={{ marginTop: "60px" }}>
        <Typography style={{ fontWeight: 300, fontSize: 35 }}>
          {t("projectsSection.title")}
        </Typography>
      </Divider>
      <Typography align="center">{t("projectsSection.description")}</Typography>
      <Typography align="center" fontSize="10px">
        {t("projectsSection.certificates")}
      </Typography>
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
          {sortedProjects.map((project: ProjectsProps, index) => {
            try {
              if (
                parseInt(
                  project.metadata.tags[0].sys.id.replace("category", "")
                ) -
                  1 !==
                value
              )
                return null;
            } catch {
              return null;
            }

            return (
              <Grid
                key={project.fields.title + index}
                item
                xs={9}
                sm={6}
                md={4}
              >
                <ProjectCard {...project} />
              </Grid>
            );
          })}
        </Grid>
        <Typography align="center" style={{ marginTop: "30px" }}>
          {t("projectsSection.howMany_1")}
          <b>{props.projects.length - 1}</b>
          {t("projectsSection.howMany_2")}
        </Typography>
      </Container>
    </>
  );
}
