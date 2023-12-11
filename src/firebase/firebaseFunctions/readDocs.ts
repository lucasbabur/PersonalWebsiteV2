import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  setDoc,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../firebaseAppConfig";

export interface ProjectData {
  category: string;
  description: string;
  image: string;
  link: string;
  title: string;
}

// type Locale = "pt-BR" | "en" | "es";
type Locale = string;

function getCollectionName(locale: Locale) {
  let collectionName = "";

  switch (locale) {
    case "pt":
      collectionName = "";
      break;
    case "es":
      collectionName = "Spanish";
      break;
    default:
      collectionName = "English";
  }

  return collectionName;
}

export async function readProjectsFromFirestore(
  locale: Locale
): Promise<ProjectData[]> {
  let projectsDataStr = "projectsData";
  projectsDataStr = "projectsData" + getCollectionName(locale);

  const docRef = doc(db, "projects", projectsDataStr);

  return (await getDoc(docRef)).data() as ProjectData[];
}

export async function readLogosFromFirestore(locale: Locale) {
  let logosDataStr = "logos";
  logosDataStr = "logos" + getCollectionName(locale);

  const docRef = doc(db, "logos", logosDataStr);

  return (await getDoc(docRef)).data();
}

export async function readSkillsFromFirestore(locale: Locale) {
  let skillsDataStr = "skills";
  skillsDataStr = "skills" + getCollectionName(locale);

  const docRef = doc(db, "skills", skillsDataStr);

  return (await getDoc(docRef)).data();
}

export async function readReadingListFromFirestore(locale: Locale) {
  let readingListDataStr = "readingList";
  readingListDataStr = "readingList" + getCollectionName(locale);

  const docRef = doc(db, "readingList", readingListDataStr);

  return (await getDoc(docRef)).data();
}
