import * as React from "react";

import { ReadingList } from "../components/readingListPage";
import Head from "next/head";

import { useFirebase } from "@/firebase/firebaseContext";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

function ReadingListPage() {
  const [bookData, setBookData] = React.useState<any>([]);

  const { t, i18n } = useTranslation("readingListPage");
  const { functions } = useFirebase();

  React.useEffect(() => {
    async function fetchData() {
      const data: any = await functions.readReadingListFromFirestore(
        i18n.language
      );
      const booksArray = Object.keys(data).map((key) => {
        return {
          title: data[key].title,
          subtitle: data[key].subtitle,
          image: data[key].image,
        };
      });
      setBookData(booksArray);
    }
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Reading list</title>
      </Head>
      (bookData.length != 0 &&{" "}
      <ReadingList title={t("title")} data={bookData} />)
    </>
  );
}

export default ReadingListPage;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "readingListPage",
        "projectsCommon",
      ])),
    },
  };
};
