import { GlobalData } from "./global-data";
import { LinkButtonData } from "./link-button-data";
import { SeoData } from "./seo-data";

export type LocalizationPageData = {
  localizationPage: {
    mainText: string;
    ukButton: LinkButtonData;
    chButton: LinkButtonData;
    seo?: SeoData;
  };
  global: GlobalData;
};
