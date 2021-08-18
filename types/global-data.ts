import { Media } from "./media";
import { SeoData } from "./seo-data";
import { FormsData } from './forms-data';
import { CookieInfoData } from './cookie-info-data';

export type GlobalData = {
  favicon?: Media;
  siteName: string;
  defaultSeo: SeoData;
  logo?: Media[];
  form: FormsData;
  cookieInfo: CookieInfoData;
  backToMainPageButtonLabel: string;
};
