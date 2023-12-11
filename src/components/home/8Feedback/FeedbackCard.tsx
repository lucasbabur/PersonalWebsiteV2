import React from "react";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

interface FeedbackCardProps {
  name: string;
  subtitle: string;
  description: string;
  avatar: string;
}

export function FeedbackCard(props: FeedbackCardProps) {
  return (
    <Grid
      item
      xs={9}
      sm={6}
      md={4}
      style={{ height: "300px", overflow: "hidden" }}
    >
      <Card sx={{ height: "265px" }}>
        <CardHeader
          avatar={
            <Avatar
              role="img"
              aria-label={"Foto de" + props.name}
              src={props.avatar}
              alt={props.name}
            />
          }
          title={props.name}
          subheader={
            <Typography style={{ lineHeight: "10px", fontSize: "13px" }}>
              {props.subtitle}
            </Typography>
          }
        />
        <CardContent style={{ marginTop: "-10px" }}>
          <Typography
            variant="body2"
            color="text.secondary"
            style={{ textAlign: "justify" }}
          >
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
