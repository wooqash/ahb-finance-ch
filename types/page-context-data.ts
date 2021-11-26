import { LocalizationPageData } from "./localization-page-data";
import { LocalizedPathsData } from "./localized-paths-data";

export type PageContextData = {
    locale: string;
    locales: string[] | undefined;
    defaultLocale: string | undefined;
    slug: string | undefined;
    slugs: { locale: string | undefined, slug: string | undefined }[] | undefined;
    localizations: [{ locale: string; }];
}

export interface ExtendedPageContextData extends PageContextData {
    localizedPaths?: LocalizedPathsData[];
}