import React from "react";
import { Container, Grid, Avatar, Box, Typography } from "@mui/material";

export interface ProfessionalHistoryProps {
  alt: string;
  src: string;
  title: string;
  institution: string;
  year: string;
}

interface ProfessionalStampProps {
  alt: string;
  src: string;
  jobTitle: string;
  empresa: string;
  year: string;
}

const ProfessionalStamp: React.FC<ProfessionalStampProps> = ({
  alt,
  src,
  jobTitle,
  empresa,
  year,
}) => (
  <Box
    sx={{
      flexDirection: "column",
      p: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Avatar
      alt={alt}
      src={src}
      sx={{ width: 150, height: 150, mt: 2.5, mb: 0 }}
    />
    <Typography align="justify" variant="h6" sx={{ fontSize: 17 }}>
      {jobTitle}
    </Typography>
    <Typography align="justify">{empresa}</Typography>
    <Typography align="justify" variant="caption">
      {year}
    </Typography>
  </Box>
);

interface ProfessionalProps {
  professionalHistory: ProfessionalHistoryProps[];
}

const Professional: React.FC<ProfessionalProps> = ({ professionalHistory }) => (
  <Container
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <Grid
      container
      sx={{
        mt: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {professionalHistory.map((item, index) => (
        <ProfessionalStamp
          key={`${item.title}-${index}`}
          alt={item.alt}
          src={item.src}
          jobTitle={item.title}
          empresa={item.institution}
          year={item.year}
        />
      ))}
    </Grid>
    <Box sx={{ height: 110 }} />
  </Container>
);

export default Professional;
