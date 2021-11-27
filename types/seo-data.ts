import { Media } from "./media";
import { OpenGraphData } from "./open-graph-data";
import { TwitterCardData } from "./twitter-card-data";

export type SeoData = {
    metaTitle: string;
    metaTitleSuffix?: string;
    metaDescription: string;
    metaKeywords?: string;
    preventIndexing: boolean;
    preventFollowing: boolean;
    cannonicalLink?: string;
    shareImage?: Media;
    openGraph?: OpenGraphData;
    twitterCard?: TwitterCardData;
}