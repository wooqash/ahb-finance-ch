import { Media } from "types/media";

export enum ButtonType {
    primary = "primary",
    secondary = "secondary"
}

export interface ButtonData {
    id: number | string;
    label: string;
    type: ButtonType;
}

export interface ButtonLinkData extends ButtonData {
    url: string;
    newTab?: boolean;
    ariaNewTabLabel?: string;
}

export interface LinkData {
    id: number | string;
    label: string;
    url: string;
    newTab: boolean;
    ariaNewTabLabel?: string;
}

export interface SocialLinkData {
    id: number | string;
    type: SocialLinkTypes;
    link: LinkData;
}

export interface IconButtonLinkData {
    id: number | string;
    icon: Media;
    link: LinkData;
}

export interface LogoLinkData {
    id: number | string;
    image: Media;
    link: LinkData;
}

enum SocialLinkTypes {
    FACEBOOK = 'facebook',
    INSTAGRAM = 'instagram',
    YOUTUBE = 'youtube',
    LINKEDIN = 'linkedin',
    TWITTER = 'twitter',
    TIKTOK = 'tiktok',
    SNAPCHAT = 'snapchat',
    GOOGLEPLUS = 'googleplus',
    PINTEREST = 'pinterest',
    BEHANCE = 'behance',
    DRIBBLE = 'dribble'
}
