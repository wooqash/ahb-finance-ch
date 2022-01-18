import { Media } from "types/media";
import { getStrapiMedia } from "utils/media";
import Image, { ImageLoaderProps } from "next/image";

type CustomImageProps = {
  media: Pick<Media, "url" | "width" | "height" | "alternativeText">,
  layout?: "intrinsic" | "fixed" | "fill" | "responsive" | undefined,
  isBgImage?: boolean,
  quality?: number,
  cWidth?: number,
  cHeight?: number
};

const CustomImage: React.FC<CustomImageProps> = (props) => {
  const { media, layout = "intrinsic", isBgImage, cWidth, cHeight } = props;
  const { url, alternativeText} = media;
  const width = cWidth || media.width;
  const height = cHeight || media.height;

  const loader = (prop: ImageLoaderProps) => {
    const url = getStrapiMedia(prop.src) || "";
    return url;
  };

  if (layout === "intrinsic") {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ""} {...media} />
    );
  }
  
  // The image has a fixed width and height
  if (width && height && layout === "fixed") {
    return (
      <Image loader={loader} src={url} alt={alternativeText || ""} layout="fixed" width={width} height={height} />
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

export default CustomImage;
