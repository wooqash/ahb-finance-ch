import { Media } from "types/media";
import { getStrapiMedia } from "utils/media";
import Image, { ImageLoaderProps } from "next/image";

type NextImageProps = {
  media: Pick<Media, "url" | "width" | "height" | "alternativeText">;
  layout?: "intrinsic" | "fixed" | "fill" | "responsive" | undefined;
  isBgImage?: boolean; 
};

const NextImage: React.FC<NextImageProps> = (props) => {
  const { media, layout = "intrinsic", isBgImage } = props;
  const { url, alternativeText, width, height } = media;

  const loader = (prop: ImageLoaderProps) => {
    const url = getStrapiMedia(prop.src) || "";
    return url;
  };

  // The image has a fixed width and height
  if (width && height) {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ""} {...media} />
    );
  }

  if (isBgImage) {
      return (
        <Image loader={loader} src={url} alt={alternativeText || ""} layout="fill" objectFit="cover" />
      )
  }

  // The image is responsive
  return (
    <Image
      loader={loader}
      layout="responsive"
      objectFit="contain"
      src={url}
      alt={alternativeText || ""}
      {...media}
    />
  );
};

export default NextImage;
