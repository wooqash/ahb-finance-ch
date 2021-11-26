import { ButtonType } from "types/button-type.enum";

export type ButtonLink = {
    label: string;
    url: string;
    newTab: boolean;
    type?: ButtonType;
}