import { Media } from "./media";
import { SeoData } from "./seo-data";
import { FormsData } from './forms-data';

export type GlobalData = {
  favicon?: Media;
  siteName: string;
  defaultSeo: SeoData;
  logo?: Media[];
  form: FormsData;
};
