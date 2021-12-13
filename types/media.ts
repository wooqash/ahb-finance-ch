export interface ImageInfo {
    ext: string;
    hash: string;
    height: number;
    mime: string;
    name: string;
    size: number;
    url: string;
    width: number;
};

export interface Media extends ImageInfo {
    id: number | string;
    alternativeText?: string;
    caption?: string;
    formats: {
        large: ImageInfo;
        medium: ImageInfo;
        small: ImageInfo;
        thumbnail: ImageInfo;
    };
};

