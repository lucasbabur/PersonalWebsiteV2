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
  ProjectsProps,
} from "@/components/home";
import Head from "next/head";

import { createClient } from "contentful";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home({ cards }: { cards: ProjectsProps[] }) {
  console.log(cards);
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
      {cards.length > 0 && <Projects projects={cards} />}
      <OtherConquests />
      <Feedback />
      <Contact />
      <Footer />
    </>
  );
}

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export async function getStaticProps({ params, locale }: any) {
  if (locale === "es") locale = "en";

  const { items } = await client.getEntries({
    content_type: "card",
    locale,
  });

  return {
    props: {
      cards: items as unknown as ProjectsProps[],
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
