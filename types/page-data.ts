import { HeroData } from "./sections/hero-data";
import { SeoData } from "./seo-data";

export type PageData = {
    title: string;
    seo: SeoData;
    slug?: string;
    locale: string;
    contentSections: [HeroData];
    localizations: [ {locale: string} ]
}