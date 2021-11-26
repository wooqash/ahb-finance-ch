import { Media } from "./media";
import { SeoData } from "./seo-data";
import { FormsData } from './forms-data';
import { CookieInfoData } from './cookie-info-data';
import { NavbarData } from "./layout/navbar-data";
import { FooterSectionData } from "./elements/footer-section-data";

export type GlobalData = {
  favicon?: Media;
  defaultSeo: SeoData;
  logo?: Media[];
  form: FormsData;
  cookieInfo: CookieInfoData;
  backToMainPageButtonLabel: string;
  mainNav: NavbarData;
  footerMenu: FooterSectionData;
};
