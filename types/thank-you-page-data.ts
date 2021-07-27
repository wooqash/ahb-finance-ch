import { GlobalData } from "./global-data";
import { SeoData } from "./seo-data";

export type ThankYouPageData = {
    thankYouPage: {
      content: string;
      seo: SeoData;
    };
    global: GlobalData;
};