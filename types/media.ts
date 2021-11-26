import { ImageInfo } from "./image-info";

export type Media = {
    name: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
    mime: string;
    url: string;
    formats: {
        large: ImageInfo;
        medium: ImageInfo;
        small: ImageInfo;
        thumbnail: ImageInfo;
    };
    hash: string;
}