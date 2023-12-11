import React from "react";
import { Typography, Box } from "@mui/material";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface InfoAreaProps {
  medal?: boolean;
  extension?: boolean;
  title: string;
  number: number;
  icon: React.ReactNode;
}

const InfoArea: React.FC<InfoAreaProps> = ({ title, number, icon }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5, // A value between 0 and 1
  });

  return (
    <Box
      ref={ref} // Attach the ref here
      sx={{
        display: "flex",
        flexDirection: "row",
        border: "1px solid black",
        borderRadius: "10px",
        p: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          marginRight: "30px",
        }}
      >
        <Typography variant="h5">
          +{inView ? <CountUp end={number} duration={4} /> : "+"}
        </Typography>
        <Typography>{title}</Typography>
      </Box>
      {icon}
    </Box>
  );
};

export default InfoArea;
