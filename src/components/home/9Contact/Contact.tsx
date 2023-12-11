import React from "react";

import Divider from "@mui/material/Divider";

import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Message from "./MessagePopup";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { useTranslation } from "next-i18next";
import { useFirebase } from "../../../firebase/firebaseContext";

import { useFormik } from "formik";
import * as Yup from "yup";

export function Contact() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [isSendButtonDisabled, setisSendButtonDisabled] = React.useState(false);
  const [messageTitle, setMessageTitle] = React.useState("");
  const [messageContent, setMessageContent] = React.useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("contact.emailErrors.invalid"))
      .required(t("contact.emailErrors.required")),
    subject: Yup.string()
      .max(200, t("contact.subjectErrors.maxlength"))
      .min(20, t("contact.subjectErrors.minlength"))
      .required(t("contact.messageErrors.required")),
    message: Yup.string()
      .max(2000, t("contact.messageErrors.maxlength"))
      .min(50, t("contact.messageErrors.minlength"))
      .required(t("contact.messageErrors.required")),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      subject: "",
      message: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      setisSendButtonDisabled(true);
      functions
        .writeNewMessage(values)
        .then(() => {
          setMessageTitle(t("contact.messageSent.title"));
          setMessageContent(t("contact.messageSent.content"));
          handleClickOpen();
          setTimeout(() => {
            setisSendButtonDisabled(false);
          }, 5000);
          resetForm();
        })
        .catch((error) => {
          setMessageTitle(t("contact.messageError.title"));
          setMessageContent(t("contact.messageError.content"));
          setTimeout(() => {
            setisSendButtonDisabled(false);
          }, 5000);
          handleClickOpen();
        });
    },
  });

  const { functions } = useFirebase();

  const handleClickOpen = () => setOpen(true);

  const Email = () => {
    handleClickOpen();
    setMessageTitle("E-Mail");
    setMessageContent("E-Mail lucasbabur@gmail.com");
  };

  const WhatsApp = () => {
    if (window !== undefined) {
      window.open(
        "https://api.whatsapp.com/send?phone=5521969039156&text=Ol%C3%A1!"
      );
    }
  };

  const commonTextFieldProps = {
    color: "secondary" as "secondary",
    fullWidth: true,
    required: true,
  };

  return (
    <>
      <div id="contato" />
      <Divider style={{ marginTop: "50px" }}>
        <Typography variant="h4" style={{ fontWeight: 300, fontSize: 35 }}>
          {t("contact.title")}
        </Typography>
      </Divider>

      <Container component="div" maxWidth="md" style={{ marginTop: "40px" }}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              name="email"
              label={t("contact.emailPlaceholder")}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              {...commonTextFieldProps}
            />
            <TextField
              name="subject"
              label={t("contact.subjectPlaceholder")}
              value={formik.values.subject}
              onChange={formik.handleChange}
              error={formik.touched.subject && Boolean(formik.errors.subject)}
              helperText={formik.touched.subject && formik.errors.subject}
              {...commonTextFieldProps}
              style={{ marginTop: "30px" }}
            />
            <TextField
              name="message"
              label={t("contact.messagePlaceholder")}
              value={formik.values.message}
              onChange={formik.handleChange}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
              {...commonTextFieldProps}
              style={{ marginTop: "30px" }}
              multiline
              rows={4}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              style={{ marginTop: "20px", width: "120px" }}
              disabled={isSendButtonDisabled}
            >
              {t("contact.sendButtonText")}
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "15px",
            }}
          >
            <IconButton
              onClick={() => Email()}
              aria-label="Ver E-mail"
              style={{ marginRight: "10px" }}
            >
              <EmailIcon />
            </IconButton>
            <IconButton
              onClick={() => WhatsApp()}
              aria-label="Enviar Mensagem no WhatsApp"
              style={{ marginLeft: "10px" }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </form>

        <Message
          open={open}
          setOpen={setOpen}
          messageTitle={messageTitle}
          messageContent={messageContent}
        />
      </Container>
    </>
  );
}
