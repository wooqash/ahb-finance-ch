export type PageContext = {
    locale: string;
    locales: string[] | undefined;
    defaultLocale: string | undefined;
    slug: string | undefined;
    localizations: [{ locale: string; }];
}