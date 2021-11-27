import { NextSeo } from "next-seo";
import { ExtendedPageContextData } from "types/page-context-data";
import { SeoData } from "types/seo-data";
import { isBrowser } from "utils/is-browser";
import { getStrapiMedia } from "utils/media";

type SeoProps = {
  seo: SeoData;
  pageContext: ExtendedPageContextData;
};

const Seo: React.FC<SeoProps> = ({ seo, pageContext }) => {
  const { locale, localizedPaths } = pageContext;
  const filtredPaths = localizedPaths?.filter((path) => path.locale !== locale);

  let alternateLangs;
  if (filtredPaths) {
    alternateLangs = filtredPaths.map((path) => {
      const href = isBrowser()
        ? `${window.location.protocol}//${window.location.host}${path.href}`
        : path.href;
      return { hrefLang: path.locale, href };
    });
  }

  let ogImages = undefined;
  if (seo && seo.openGraph && seo.openGraph.image) {
    ogImages = Object.values(seo.openGraph.image).map((image) => {
      return {
        ...image,
        url: getStrapiMedia(image.url),
      };
    });
  }

  return (
    <NextSeo
      title={seo.metaTitle}
      description={seo.metaDescription}
      noindex={seo.preventIndexing}
      nofollow={seo.preventFollowing}
      canonical={seo.cannonicalLink}
      languageAlternates={alternateLangs}
      openGraph={{
        type: seo.openGraph?.type,
        url: seo.openGraph?.url,
        title: seo.openGraph?.title || seo.metaTitle,
        description: seo.openGraph?.description || seo.metaDescription,
        images: ogImages,
        locale: seo.openGraph?.locale
      }}
      facebook={{ appId: seo.openGraph?.fbAppId?.toString() || "" }}
      twitter={{
        cardType: seo.twitterCard?.card,
        handle: seo.twitterCard?.username,
      }}
    ></NextSeo>
  );
};

export default Seo;
