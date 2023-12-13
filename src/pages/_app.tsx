import type { AppProps } from "next/app";
import { FirebaseProvider } from "../firebase/firebaseContext";
import Head from "next/head";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { theme } from "../theme";
import createEmotionCache from "../config/createEmotionCache";
import { appWithTranslation } from "next-i18next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { FirebaseInitializer } from "@/firebase/firebaseAppConfig";
import { SEO, LogoObject } from "@/config/metaConfigs";

const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function App(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <FirebaseProvider>
        <FirebaseInitializer />
        <SpeedInsights />
        <Head>
          <title>{SEO.title}</title>
          <link rel="shortcut icon" href={LogoObject.favicon} />
          <meta name="description" content={SEO.description} />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/image/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/image/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/image/favicon-16x16.png"
          />
        </Head>

        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </React.StrictMode>
      </FirebaseProvider>
    </CacheProvider>
  );
}

export default appWithTranslation(App);
