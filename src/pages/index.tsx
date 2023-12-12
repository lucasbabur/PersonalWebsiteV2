import {
  Navbar,
  Hero,
  WhoAmI,
  DataInNumbers,
  Logos,
  Projects,
  OtherConquests,
  Feedback,
  Contact,
  Footer,
} from "@/components/home";
import Head from "next/head";

import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <>
      <Head>
        <title>Lucas Tejedor</title>
      </Head>
      <Navbar />
      <Hero />
      <WhoAmI />
      <Logos />
      <DataInNumbers />
      <Projects />
      <OtherConquests />
      <Feedback />
      <Contact />
      <Footer />
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
