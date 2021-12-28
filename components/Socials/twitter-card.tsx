import { OpenGraphData } from "types/open-graph-data";
import { TwitterCardData } from "types/twitter-card-data";
import { TwitterCardType } from "types/twitter-card-type.enum";

type TwitterCardProps = {
  twitterCard: TwitterCardData;
  openGraph: OpenGraphData | undefined;
  meta?: {
    metaTitle: string;
    metaDescription: string;
  };
};

const TwitterCard: React.FC<TwitterCardProps> = ({
  twitterCard,
  openGraph,
  meta,
}) => {
  const { card, username, title, description, image, player, app } =
    twitterCard;
  const ogTitle = openGraph?.title || null;
  const ogUrl = openGraph?.url || null;
  const ogImage = openGraph?.image || null;
  const ogDescription = openGraph?.description || null;

  let tcTitleTag, tcUsernameTag, tcDescriptionTag, tcImageTag, tcImageAltTag;

  const tcTitle = ogTitle || title || meta?.metaTitle || null;
  if (tcTitle) {
    tcTitleTag = <meta name="twitter:title" content={tcTitle} />;
  }

  const tcUsername = username || null;
  if (tcUsername) {
    tcUsernameTag = <meta name="twitter:site" content={tcUsername} />;
  }

  const tcDescription =
    ogDescription || description || meta?.metaDescription || null;
  if (tcDescription) {
    tcDescriptionTag = (
      <meta name="twitter:description" content={tcDescription} />
    );
  }

  const tcImage =
    ogImage?.formats.large.url || image?.formats.large.url || null;
  if (tcImage) {
    tcImageTag = <meta name="twitter:image" content={tcImage} />;
  }

  const tcImageAlt = ogImage?.alt || image?.alternativeText || null;
  if (tcImageAlt) {
    tcImageAltTag = <meta name="twitter:image:alt" content={tcImageAlt} />;
  }

  let tcUrl, tcWidth, tcHeight, tcThumbnail, tcThumbnailAlt;
  let tcUrlTag, tcWidthTag, tcHeightTag, tcThumbnailTag, tcThumbnailAltTag;
  let appIdIphone, appIdIpad, appIdGooglePlay, appUrlIphone, appUrlIpad, appCountry, appUrlGooglePlay;
  let appIdIphoneTag, appIdIpadTag, appIdGooglePlayTag, appUrlIphoneTag, appUrlIpadTag, appCountryTag, appUrlGooglePlayTag;

  console.log('CARD - ', card)

  if (card === TwitterCardType.player && player) {
    tcUrl = ogUrl || player.url || null;
    if (tcUrl) {
      tcUrlTag = <meta name="twitter:player" content={tcUrl} />;
    }

    tcWidth = player.width.toString() || null;
    if (tcWidth) {
      tcWidthTag = <meta name="twitter:player:width" content={tcWidth} />;
    }

    tcHeight = player.height.toString() || null;
    if (tcHeight) {
      tcHeightTag = <meta name="twitter:player:height" content={tcHeight} />;
    }

    tcThumbnail = player.thumbnail?.formats.large.url || null;
    if (tcThumbnail) {
      tcThumbnailTag = <meta name="twitter:image" content={tcThumbnail} />;
    }

    tcThumbnailAlt = player.thumbnail?.alternativeText || null;
    if (tcThumbnailAlt) {
      tcThumbnailAltTag = (
        <meta name="twitter:image" content={tcThumbnailAlt} />
      );
    }
  } else if (card === TwitterCardType.app && app) {
    appIdIphone = app.appIdIphone.toString() || null;
    if (appIdIphone) {
        appIdIphoneTag = <meta name="twitter:app:id:iphone" content={appIdIphone} />
    }

    appIdIpad = app.appIdIpad.toString() || null;
    if (appIdIpad) {
        appIdIpadTag = <meta name="twitter:app:id:ipad" content={appIdIpad} />
    }

    appIdGooglePlay = app.appIdGooglePlay.toString() || null;
    if (appIdGooglePlay) {
        appIdGooglePlayTag = <meta name="twitter:app:id:googleplay" content={appIdGooglePlay} />
    }

    appUrlIphone = app.appUrlIphone || null;
    if (appUrlIphone) {
        appUrlIphoneTag = <meta name="twitter:app:url:iphone" content={appUrlIphone} />
    }

    appUrlGooglePlay = app.appUrlGooglePlay || null;
    if (appUrlGooglePlay) {
        appUrlGooglePlayTag = <meta name="twitter:app:url:googleplay" content={appUrlGooglePlay} />
    }

    appUrlIpad = app.appUrlIpad || null;
    if (appUrlIpad) {
        appUrlIpadTag = <meta name="twitter:app:url:ipad" content={appUrlIpad} />
    }

    appCountry = app.appCountry || null;
    if (appCountry) {
        appCountryTag = <meta name="twitter:app:country" content={appCountry} />
    }
  }

  return (
    <>
      {card && <meta name="twitter:card" content={card} />}
      {tcTitleTag}
      {tcUsernameTag}
      {tcDescriptionTag}
      {tcImageTag}
      {tcImageAltTag}

      {tcUrlTag}
      {tcWidthTag}
      {tcHeightTag}
      {tcThumbnailTag}
      {tcThumbnailAltTag}

      {appIdIphoneTag}
      {appIdIpadTag}
      {appIdGooglePlayTag}
      {appUrlIphoneTag}
      {appUrlIpadTag}
      {appCountryTag}
      {appUrlGooglePlayTag}
    </>
  );
};

export default TwitterCard;
