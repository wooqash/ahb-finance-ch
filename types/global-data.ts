import { Media } from "./media";
import { SeoData } from "./seo-data";
import { FormsData } from './forms-data';
import { CookieInfoData } from './cookie-info-data';
import { NavbarData } from "./layout/navbar-data";
import { FooterData } from "./layout/footer-data";
import { SocialMediaLinksData } from "./social-media-links-data";

export type GlobalData = {
  metaTitle: string;
  favicon?: Media;
  defaultSeo: SeoData;
  logo?: Media[];
  form: FormsData;
  cookieInfo: CookieInfoData;
  backToMainPageButtonLabel: string;
  mainNav: NavbarData;
  footer: FooterData;
  socialMediaLinks?: SocialMediaLinksData;
};
