import * as React from "react";

import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useTranslation } from "next-i18next";

interface HeadlineProps {
  title: string;
  description: string;
  day: string;
  author: string;
}

export function Headline({ title, description, day, author }: HeadlineProps) {
  const [date, setDate] = React.useState<string>("");
  const { t } = useTranslation("projectsCommon");

  React.useEffect(() => {
    setDate(calculateDateDifference());
  }, []);

  const formatDate = (dateString: string) => {
    const year = dateString.slice(6);
    const month = dateString.slice(0, 2);
    const day = dateString.slice(3, 5);
    return new Date(`${year}-${month}-${day}`);
  };

  const calculateDateDifference = () => {
    const now = new Date();
    const formattedDay = formatDate(day);
    const differenceInTime = now.getTime() - formattedDay.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    switch (true) {
      case differenceInDays < 7:
        return t("headline.updateStatus.updatedDaysAgo", {
          count: differenceInDays,
        });

      case differenceInDays === 7:
        return t("headline.updateStatus.updatedWeekAgo");

      case differenceInDays === 14:
        return t("headline.updateStatus.updatedTwoWeeksAgo");

      case differenceInDays > 30 && differenceInDays <= 60:
        return t("headline.updateStatus.updatedMoreThanMonth");

      default:
        return t("headline.updateStatus.updatedOn", { day: day });
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: "5vh" }}>
      <Typography variant="h3" textAlign="center" mb={2} fontWeight="bold">
        {title}
      </Typography>
      <Typography textAlign="justify" mt={2}>
        {description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
          mt: 2,
        }}
      >
        <Typography
          style={{
            textAlign: "justify",
            marginTop: "20px",
            fontWeight: "400",
          }}
        >
          <Typography style={{ fontWeight: "1000" }}>Por {author}</Typography>
          {day} ▪ {date}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box>
          <IconButton
            aria-label="instagram"
            onClick={() =>
              window.open("https://www.instagram.com/lucas.tejedor.s/")
            }
            sx={{ color: "#E1306C" }}
          >
            <InstagramIcon />
          </IconButton>
          <IconButton
            aria-label="whatsapp"
            onClick={() =>
              window.open(
                "https://api.whatsapp.com/send?phone=5521969039156&text=Ol%C3%A1!"
              )
            }
            sx={{ color: "#075e54" }}
          >
            <WhatsAppIcon />
          </IconButton>
          <IconButton
            aria-label="linkedin"
            onClick={() =>
              window.open("https://www.linkedin.com/in/lucas-t-a20b01141/")
            }
            sx={{ color: "#0e76a8" }}
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider variant="middle" sx={{ my: 4 }} />
    </Container>
  );
}
