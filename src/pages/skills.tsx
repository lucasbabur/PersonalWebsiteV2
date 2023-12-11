import { SkillsList, Category } from "@/components/skillsListPage";
import { useTranslation } from "next-i18next";
import { GrVulnerability } from "react-icons/gr";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";

import * as React from "react";

function SkillListPage() {
  const { t, i18n } = useTranslation("skillsPage");

  console.log(
    i18n.t("skillsPage:Skills", {
      returnObjects: true,
    }) as unknown as Category[]
  );

  return (
    <>
      <Head>
        <title>Skills</title>
      </Head>
      <SkillsList
        title={"Habilidades"}
        subtitle={"Minhas Habilidades"}
        Data={
          i18n.t("skillsPage:Skills", {
            returnObjects: true,
          }) as unknown as Category[]
        }
        icon={<GrVulnerability />}
      />
    </>
  );
}

export default SkillListPage;

export const getStaticProps: GetStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "skillsPage",
        "projectsCommon",
      ])),
    },
  };
};
