import { ButtonType } from "types/button-type";

export type ButtonLink = {
    label: string;
    url: string;
    newTab: boolean;
    type?: ButtonType;
}