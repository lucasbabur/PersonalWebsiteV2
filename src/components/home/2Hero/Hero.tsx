import React, { useState, useEffect, useRef, FC, memo } from "react";
import styles from "../../../styles/2hero.module.css";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { Link } from "react-scroll";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "next-i18next";
import { STANDARD_LINKS_PROPS } from "@/config/metaConfigs";

interface VidPlayerProps {
  videoref: React.RefObject<HTMLVideoElement>;
}

const VidPlayer: FC<VidPlayerProps> = memo(({ videoref }) => (
  <video
    ref={videoref}
    loop
    muted
    autoPlay
    playsInline
    className={styles.video}
  >
    <source src={"/Hero/Video.mp4"} type="video/mp4" />
  </video>
));

VidPlayer.displayName = "VidPlayer";

export function Hero() {
  const { t } = useTranslation();
  const [hasWindow, setHasWindow] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const { inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHasWindow(true);
    }
    if (inView && videoRef.current) {
      videoRef.current.play();
    }
  }, [inView]);

  return (
    <Box className={styles.background} ref={divRef}>
      {hasWindow && <VidPlayer videoref={videoRef} />}

      <Typography
        sx={{
          fontSize: {
            lg: "100px", // font size on large screens
            md: "80px", // font size on medium screens
            sm: "60px", // font size on small screens
            xs: "40px", // font size on extra small screens
          },
          textAlign: "center",
          color: "white",
          fontWeight: 500,
        }}
      >
        Lucas Tejedor
      </Typography>
      <Typography
        sx={{
          fontSize: {
            lg: "32px",
            md: "28px",
            sm: "24px",
            xs: "20px",
          },
          textAlign: "center",
          color: "white",
          fontWeight: 400,
        }}
      >
        {t("hero.heroSubtitle")}
      </Typography>

      <Box mt={2}>
        <Link to="WhoAmI" {...STANDARD_LINKS_PROPS}>
          <Button variant="contained">{t("hero.heroButtonText")}</Button>
        </Link>
      </Box>
      <div className={styles.arrow_down} />
    </Box>
  );
}
