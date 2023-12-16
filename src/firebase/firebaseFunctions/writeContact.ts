import { db } from "../firebaseAppConfig";
import { doc, setDoc } from "firebase/firestore";

interface Message {
  email: string;
  message: string;
  subject: string;
}

export async function writeNewMessage(message: Message) {
  try {
    const projectsDataRef = doc(db, "messages", "message " + Date.now());
    await setDoc(projectsDataRef, {
      to: ["lucasbabur@gmail.com"],
      message: {
        subject: message.subject,
        text: message.message,
        html:
          message.message + "\nEste e-mail foi enviado para: " + message.email,
      },
    });
  } catch (error) {}
}
