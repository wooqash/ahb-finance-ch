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

export interface IconButtonLinkData {
    id: number | string;
    icon: Media;
    link: LinkData;
}