import { GlobalData } from "./global-data";
import { SeoData } from "./seo-data";

export type FinalThankYouPageData = {
    finalThankYouPage: {
      content: string;
      seo: SeoData;
    };
    global: GlobalData;
};