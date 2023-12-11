/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ["pt", "en", "es"],
    defaultLocale: "pt",
  },
  localePath: require("path").resolve("./public/locales"),
};
