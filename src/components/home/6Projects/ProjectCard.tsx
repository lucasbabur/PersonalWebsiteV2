import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { ProjectData } from "@/firebase/firebaseFunctions";

export function ProjectCard(props: ProjectData) {
  const { title, description, image, link } = props;

  return (
    <Card>
      <CardActionArea href={link} target="_blank">
        <CardMedia
          component="img"
          height="145"
          image={image}
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
