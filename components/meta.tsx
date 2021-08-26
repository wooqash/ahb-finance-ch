import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import { GlobalData } from "types/global-data";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

type MetaProps = {
  globalSettings: GlobalData;
};

const Meta: React.FC<MetaProps> = ({ globalSettings }) => {
  const { defaultSeo, siteName } = globalSettings;
  const { metaTitle, metaDescription } = defaultSeo;
  const [pageUrl, setPageUrl] = useState('');
  const router = useRouter();
  const { locales } = useRouter();

  useEffect(() => {
    if (window) {
      setPageUrl(`${window.location.protocol}//${window.location.host}`);
    }
},[]);
  return (
    <Head>
      {locales?.map((loc) => {
        const href = router.defaultLocale !== loc ? `${pageUrl}/${loc}${router.route}` : `${pageUrl}${router.route}`;
        let hrefLang = '';
        switch (loc) {
          case 'pl':
            hrefLang = 'pl-PL';
            break;
          case 'en':
            hrefLang = 'en-GB';
            break;
          default:
            hrefLang = 'de-CH';
            break;
        }
        return (
          <link key={loc} rel="alternate" hrefLang={hrefLang} href={href}></link>
        );
      })}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="preload"
        as="style"
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@400;500&display=swap"
        crossOrigin=""
        // media="print"
        // onLoad={() => 'this.media="all"'}
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

      <title key={metaTitle}>
        {metaTitle ? metaTitle + " | " + siteName : siteName}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};

export default Meta;
