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
    await setDoc(projectsDataRef, message);
  } catch (error) {}
}
