import { PageStatus } from "./page-status.enum";
import { SectionsData } from "./sections/sections-data";
import { SeoData } from "./seo-data";

export type PageData = {
  title: string;
  seo: SeoData;
  slug?: string;
  locale: string;
  contentSections: SectionsData;
  localizations: [{ locale: string }];
  status: PageStatus;
};
