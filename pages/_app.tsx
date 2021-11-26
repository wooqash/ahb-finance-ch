// import '@/styles/index.css'
import "../styles/index.scss";
import App from "next/app";
import ErrorPage from "next/error";
import type { AppProps /*, AppContext */ } from 'next/app';
import Head from "next/head";
import { DefaultSeo } from "next-seo";

// import React, { useEffect, useState, MouseEvent } from "react";
import React, { ReactNode } from "react";
import { getGlobalData } from "utils/api";
import { GlobalData } from "types/global-data";
import { getStrapiMedia } from "utils/media";

// import { CookieInfoData } from "types/cookie-info-data";

// import Spinner from "@/components/spinner";
// import Cookies from "@/components/Cookies/cookies";




const MyApp = ({ Component, pageProps }: AppProps) => {
  // const router = useRouter();
  // const cookieInfo: CookieInfoData = pageProps?.content?.global?.cookieInfo;
  // const [loading, setLoading] = useState(false);
  // const [modalActive, setModalActive] = useState(false);

  // const activateModal = React.useCallback(
  //   (e: MouseEvent) => {
  //     e.preventDefault();
  //     setModalActive(true);
  //   },
  //   [setModalActive]
  // );

  // useEffect(() => {
  //   const handleStart = (url: string) => setLoading(true);
  //   const handleComplete = (url: string) => setLoading(false);

  //   router.events.on("routeChangeStart", handleStart);
  //   router.events.on("routeChangeComplete", handleComplete);
  //   router.events.on("routeChangeError", handleComplete);

  //   return () => {
  //     router.events.off("routeChangeStart", handleStart);
  //     router.events.off("routeChangeComplete", handleComplete);
  //     router.events.off("routeChangeError", handleComplete);
  //   };
  // });

  const { global } = pageProps;

  if (global == null) {
    return <ErrorPage statusCode={404} />
  }

  const { defaultSeo }: GlobalData = global;

  let ogImages = undefined;
  if (defaultSeo && defaultSeo.openGraph && defaultSeo.openGraph.image) {
    ogImages = Object.values(defaultSeo.openGraph.image).map((image) => {
      return {
        ...image,
        url: getStrapiMedia(image.url),
      };
    });
  }

  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500&display=swap"
          crossOrigin=""
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="194x194"
          href="/favicon/favicon-194x194.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon/android-chrome-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#104657"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="AHB Finance Management"
        />
        <meta name="application-name" content="AHB Finance Management" />
        <meta name="msapplication-TileColor" content="#104657" />
        <meta
          name="msapplication-TileImage"
          content="/favicon/mstile-144x144.png"
        />
        <meta name="theme-color" content="#104657" />
      </Head>
      <DefaultSeo
        titleTemplate={`%s | ${defaultSeo.metaTitleSuffix}`}
        title={defaultSeo.metaTitle}
        description={defaultSeo.metaDescription}
        openGraph={{
          // images: ogImages,
          type: defaultSeo.openGraph?.type,
          url: defaultSeo.openGraph?.url,
          title: defaultSeo.openGraph?.title || defaultSeo.metaTitle,
          description: defaultSeo.openGraph?.description || defaultSeo.metaDescription,
          images: ogImages
        }}
        twitter={{
          cardType: defaultSeo.twitterCard?.card,
          handle: defaultSeo.twitterCard?.username,
        }}
      />
      <Component {...pageProps} />
      {/* <Component showCookiePolicy={activateModal} {...pageProps} /> */}
      {/* {loading && <Spinner />}
      {cookieInfo && (
        <Cookies
          content={cookieInfo}
          isActive={modalActive}
          onActivateModal={activateModal}
          setModalActive={setModalActive}
        />
      )} */}
    </>
  );
};


// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext: any) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  const globalLocale = await getGlobalData(appContext.router.locale);

  return {
    ...appProps,
    pageProps: {
      global: globalLocale,
    },
  }
}

export default MyApp;
