import { ImageInfo } from "./image-info";

export interface OpenGraphMedia {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
    type?: string;
    secureUrl?: string;
    formats: {
        large: ImageInfo;
        medium: ImageInfo;
        small: ImageInfo;
        thumbnail: ImageInfo;
    };
}