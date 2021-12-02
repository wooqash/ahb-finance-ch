import { LocalizedPathsData } from "./localized-paths-data";

export type Localization = {
    id: number;
    locale: string;
}

export type PageContextData = {
  locale: string;
  locales: string[] | undefined;
  defaultLocale: string | undefined;
  slug: string | undefined;
  slugs: { locale: string | undefined; slug: string | undefined }[] | undefined;
  localizations: Localization[];
};

export interface ExtendedPageContextData extends PageContextData {
  localizedPaths?: LocalizedPathsData[];
}
