import { Media } from "./media";

export type SeoData = {
    metaTitle: string;
    metaDescription: string;
    metaKeywords?: string;
    preventIndexing: boolean;
    cannonicalLink?: string;
    ogImage: Media;
}