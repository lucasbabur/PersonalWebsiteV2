import * as React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  width?: string;
}

export function BookCard(props: BookCardProps) {
  return (
    <Card sx={{ maxWidth: 260 }} style={{ margin: "3px", marginBottom: "5px" }}>
      <CardMedia
        data-src={props.image}
        component="img"
        height="180"
        style={{ overflow: "hidden" }}
        image={props.image}
        alt={props.title}
        title="Card_image"
      />
      <CardContent style={{ height: "175px", overflow: "hidden" }}>
        <Typography
          gutterBottom
          variant="h6"
          style={{ fontWeight: 400, lineHeight: "20px" }}
          component="div"
        >
          {props.title}
        </Typography>
        <Typography
          style={{
            fontWeight: 400,
            lineHeight: "5px",
            color: "gray",
            fontSize: "14px",
          }}
        >
          {props.author}
        </Typography>
      </CardContent>
    </Card>
  );
}
