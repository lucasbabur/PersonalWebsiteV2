import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";

import { ProjectsProps } from "./Projects";

export function ProjectCard(props: ProjectsProps) {
  const { i18n } = useTranslation();

  const title = props.fields.title;
  const description = props.fields.description;
  const imageUrl = props.fields.cardImage.fields.file.url;

  let slugLink;

  if (props.fields.slugLink !== undefined) {
    slugLink = i18n.language + "/projects/" + props.fields.slugLink.fields.slug;
  } else if (props.fields.optionalLink !== undefined) {
    slugLink = props.fields.optionalLink;
  } else {
    slugLink = "";
  }

  return (
    <Card>
      <CardActionArea href={slugLink}>
        <CardMedia
          component="img"
          height="145"
          image={imageUrl}
          alt={"Image of " + title}
        />

        <CardContent
          sx={{
            height: "175px",
            overflow: "hidden",
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            fontWeight={400}
            lineHeight={"20px"}
          >
            {title}
          </Typography>
          <Typography variant="body2" textAlign={"justify"} fontSize={"12px"}>
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
