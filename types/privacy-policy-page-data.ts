import { GlobalData } from "./global-data";
import { SeoData } from "./seo-data";

export type PrivacyPolicyPageData = {
  privacyPolicyPage: {
    content: string;
    seo: SeoData;
  };
  global: GlobalData;
};
