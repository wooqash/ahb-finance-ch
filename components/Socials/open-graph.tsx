import React from "react";
import { OpenGraphData } from "types/open-graph-data";

type OpenGraphProp = {
  openGraph: OpenGraphData;
  meta?: {
    metaTitle: string;
    metaDescription: string;
  };
};

const OpenGraph: React.FC<OpenGraphProp> = ({
  openGraph,
  meta
}) => {
  const { title, url, type, image, description, locale, fbAppId } = openGraph;
  const ogTitle = title || meta?.metaTitle || null;
  const ogDescription = description || meta?.metaDescription || null;
  const ogImage = image?.formats.large.url || null;
  
  console.log('elo - ', ogTitle, ogDescription, ogImage, type, locale, fbAppId);
  return (
    <>
      {url && <meta property="og:url" content={url} />}
      {type && <meta property="og:type" content={type} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {locale && <meta property="og:locale" content={locale} />}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {fbAppId && <meta property="fb:app_id" content={fbAppId} />}
    </>
  );
};

export default OpenGraph;
