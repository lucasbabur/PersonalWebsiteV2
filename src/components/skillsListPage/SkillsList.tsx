import React from "react";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { Navbar } from "@/components/projectsPage/";

export interface SkillsListProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  Data: Category[];
}

export interface Skill {
  name: string;
  level: number;
  levelText: string;
  color: string;
}

export interface Category {
  title: string;
  skills: Skill[];
}

export function SkillsList(props: SkillsListProps) {
  return (
    <>
      <Navbar />
      <Container
        sx={{ py: 8 }}
        style={{ marginTop: "25px", minHeight: "110vh" }}
        maxWidth="md"
        component="div"
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" style={{ fontWeight: 300 }}>
            {props.title} {props.icon}
          </Typography>
        </Box>
        <Typography align="center">{props.subtitle}</Typography>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            xl={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            spacing={4}
            style={{ marginTop: "10px" }}
            component="div"
          >
            {props.Data.map((Categoria) => {
              return (
                <Grid
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                  spacing={10}
                  key={1}
                  component="div"
                >
                  <Paper style={{ padding: "20px", height: "570px" }}>
                    <Divider>
                      <Typography style={{ fontWeight: 300, fontSize: 28 }}>
                        {Categoria.title}
                      </Typography>
                    </Divider>

                    <Container>
                      {Categoria.skills.map((skill) => {
                        return (
                          <Grid
                            item
                            xl={12}
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            key={1}
                          >
                            <Typography>{skill.name}</Typography>
                            <Slider
                              aria-label="Temperature"
                              defaultValue={skill.level}
                              min={0}
                              max={100}
                              disabled
                              step={null}
                              marks={[
                                {
                                  value: skill.level,
                                  label: skill.levelText,
                                },
                              ]}
                              style={{
                                color: skill.color,
                                marginTop: "-10px",
                              }}
                            />
                          </Grid>
                        );
                      })}
                    </Container>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Container>
    </>
  );
}
