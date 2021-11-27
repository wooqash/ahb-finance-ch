import Head from "next/head";
import { CMS_NAME, HOME_OG_IMAGE_URL } from "@/lib/constants";
import { GlobalData } from "types/global-data";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

type MetaProps = {
  globalSettings: GlobalData;
};

const Meta: React.FC<MetaProps> = ({ globalSettings }) => {
  const { defaultSeo, metaTitleSuffix } = globalSettings;
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

      <title key={metaTitle}>
        {metaTitle ? metaTitle + " | " + metaTitleSuffix : metaTitleSuffix}
      </title>
      <meta name="description" content={metaDescription} />
      <meta property="og:image" content={HOME_OG_IMAGE_URL} />
    </Head>
  );
};

export default Meta;
