import { Media } from "./media";
import { SeoData } from "./seo-data";

export type GlobalData = {
  favicon?: Media;
  siteName: string;
  defaultSeo: SeoData;
  logo?: Media[];
};
