import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";

export function threeLogos(localData: any[]) {
  let localItems = [];
  let sliderItems = 3;

  for (let i = 0; i < localData.length; i += sliderItems) {
    if (i % sliderItems === 0) {
      localItems.push(
        <Grid container spacing={0} className="BannerGrid">
          {localData.slice(i, i + sliderItems).map((logo, index) => {
            return (
              <Paper
                key={logo.key + index}
                elevation={3}
                style={{
                  padding: "10px",
                  margin: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "300px",
                  width: "30%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={logo.url}
                  alt={logo.key}
                  width={400}
                  height={300}
                  objectFit="contain"
                />
              </Paper>
            );
          })}
        </Grid>
      );
    }
  }

  return localItems;
}
