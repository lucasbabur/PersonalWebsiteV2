import React, { useState, useEffect } from "react";

import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Image from "next/image";

import Carousel from "react-material-ui-carousel";

import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

import { threeLogos } from "./ThreeLogosFunction";
import { useFirebase } from "../../../firebase/firebaseContext";
import { useTranslation } from "next-i18next";

export function Logos() {
  const { i18n } = useTranslation();
  const { functions } = useFirebase();
  const [showThreeLogos, setShowThreeLogos] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    functions.readLogosFromFirestore(i18n.language).then((data: any) => {
      setData(Object.values(data));
    });

    const showThreeLogos = () => {
      setShowThreeLogos(window.innerWidth > 1100);
    };

    showThreeLogos();
    window.addEventListener("resize", showThreeLogos);

    return () => window.removeEventListener("resize", showThreeLogos);
  }, []);

  if (showThreeLogos) {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Carousel
          navButtonsProps={{
            style: {
              backgroundColor: "#fff",
              borderRadius: 0,
              marginBottom: "30px",
            },
          }}
          navButtonsWrapperProps={{
            style: {
              bottom: "0",
              top: "unset",
              marginBottom: "40px",
              marginLeft: "10px",
              marginRight: "10px",
            },
          }}
          activeIndicatorIconButtonProps={{
            style: {
              color: "#3f50b5",
            },
          }}
          NextIcon={
            <BsFillArrowRightCircleFill
              style={{ width: "50px", height: "50px" }}
            />
          }
          PrevIcon={
            <BsFillArrowLeftCircleFill
              style={{ width: "50px", height: "50px" }}
            />
          }
        >
          {threeLogos(data).map((item, index) => (
            <React.Fragment key={index + "logo"}>{item}</React.Fragment>
          ))}
        </Carousel>
      </Container>
    );
  } else {
    return (
      <Carousel
        navButtonsProps={{
          style: {
            backgroundColor: "#fff",
            borderRadius: 0,
            marginBottom: "30px",
          },
        }}
        navButtonsWrapperProps={{
          style: {
            bottom: "0",
            top: "unset",
            marginBottom: "40px",
            marginLeft: "10px",
            marginRight: "10px",
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#3f50b5", // 2
          },
        }}
        NextIcon={
          <BsFillArrowRightCircleFill
            style={{ width: "50px", height: "50px" }}
          />
        }
        PrevIcon={
          <BsFillArrowLeftCircleFill
            style={{ width: "50px", height: "50px" }}
          />
        }
        cycleNavigation
        animation="slide"
      >
        {data.map((logo, index) => (
          <Paper
            key={index + logo.key}
            elevation={3}
            style={{
              padding: "10px",
              margin: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "300px",
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
        ))}
      </Carousel>
    );
  }
}
