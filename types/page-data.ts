import { Localization } from "./page-context-data";
import { PageStatus } from "./page-status.enum";
import { SectionsData } from "./sections-data";
import { SeoData } from "./seo-data";

export type PageData = {
  title: string;
  seo: SeoData;
  slug?: string;
  locale: string;
  contentSections: SectionsData[];
  localizations: Localization[];
  status: PageStatus;
};


